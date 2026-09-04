export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Tratak Razorpay webhook running", {
        status: 200
      });
    }

    try {
      // 1. Read RAW body for Razorpay signature verification
      const rawBody = await request.text();

      const signature =
        request.headers.get("x-razorpay-signature") || "";

      // 2. Verify Razorpay webhook signature
      const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(env.RAZORPAY_WEBHOOK_SECRET),
        {
          name: "HMAC",
          hash: "SHA-256"
        },
        false,
        ["sign"]
      );

      const signatureBuffer = await crypto.subtle.sign(
        "HMAC",
        key,
        new TextEncoder().encode(rawBody)
      );

      const calculatedSignature = Array.from(
        new Uint8Array(signatureBuffer)
      )
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");

      if (signature !== calculatedSignature) {
        return new Response("Invalid webhook signature", {
          status: 400
        });
      }

      // 3. Parse verified Razorpay webhook
      const body = JSON.parse(rawBody);
      const event = body.event;

      console.log("Razorpay event:", event);

      // Only process successful/active subscription events
      const allowedEvents = [
        "subscription.activated",
        "subscription.charged",
        "subscription.authenticated"
      ];

      if (!allowedEvents.includes(event)) {
        return new Response(
          `Webhook received: ${event}`,
          { status: 200 }
        );
      }

      const subscription = body.payload?.subscription?.entity;
      const payment = body.payload?.payment?.entity;

      if (!subscription) {
        return new Response(
          "No subscription data found",
          { status: 200 }
        );
      }

      const subscriptionId = subscription.id || null;
      const customerId = subscription.customer_id || null;

      // Try to obtain customer's phone/email from webhook
      const phone =
        payment?.contact ||
        subscription?.contact ||
        null;

      const email =
        payment?.email ||
        subscription?.email ||
        null;

      if (!phone && !email) {
        return new Response(
          "Webhook verified, but customer phone/email was not found",
          { status: 200 }
        );
      }

      // 4. Find matching Supabase profile
      let profileUrl =
        `${env.SUPABASE_URL}/rest/v1/profiles?select=id`;

      if (phone) {
        profileUrl +=
          `&phone=eq.${encodeURIComponent(phone)}`;
      } else {
        profileUrl +=
          `&email=eq.${encodeURIComponent(email)}`;
      }

      const profileResponse = await fetch(profileUrl, {
        headers: {
          apikey: env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization:
            `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`
        }
      });

      if (!profileResponse.ok) {
        const error = await profileResponse.text();

        return new Response(
          `Supabase profile lookup failed: ${error}`,
          { status: 500 }
        );
      }

      const profiles = await profileResponse.json();

      if (!profiles || profiles.length === 0) {
        return new Response(
          "Webhook verified, but no matching website profile found",
          { status: 200 }
        );
      }

      const userId = profiles[0].id;

      // 5. Calculate membership period
      const now = new Date().toISOString();

      const periodStart =
        subscription.current_start
          ? new Date(
              subscription.current_start * 1000
            ).toISOString()
          : now;

      const periodEnd =
        subscription.current_end
          ? new Date(
              subscription.current_end * 1000
            ).toISOString()
          : null;

      // 6. Create or update membership
      const membershipResponse = await fetch(
        `${env.SUPABASE_URL}/rest/v1/memberships?on_conflict=user_id`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: env.SUPABASE_SERVICE_ROLE_KEY,
            Authorization:
              `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
            Prefer: "resolution=merge-duplicates"
          },
          body: JSON.stringify({
            user_id: userId,
            status: "active",
            razorpay_subscription_id: subscriptionId,
            razorpay_customer_id: customerId,
            current_period_start: periodStart,
            current_period_end: periodEnd,
            updated_at: now
          })
        }
      );

      if (!membershipResponse.ok) {
        const error = await membershipResponse.text();

        return new Response(
          `Membership update failed: ${error}`,
          { status: 500 }
        );
      }

      // 7. Also update profile for your current dashboard
      const profileUpdateResponse = await fetch(
        `${env.SUPABASE_URL}/rest/v1/profiles?id=eq.${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            apikey: env.SUPABASE_SERVICE_ROLE_KEY,
            Authorization:
              `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`
          },
          body: JSON.stringify({
            membership_status: "active"
          })
        }
      );

      if (!profileUpdateResponse.ok) {
        console.log(
          "Membership created but profile status update failed"
        );
      }

      return new Response(
        "Membership activated successfully",
        { status: 200 }
      );

    } catch (error) {
      console.error(error);

      return new Response(
        `Server error: ${error.message}`,
        { status: 500 }
      );
    }
  }
};
