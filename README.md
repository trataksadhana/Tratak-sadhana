# Tratak Sadhana Complete Website

## Files
- index.html — sales website
- style.css — responsive design
- login.html / auth.js — Supabase login
- dashboard.html / dashboard.js — protected member dashboard
- supabase-schema.sql — database setup
- cloudflare-worker.js — Razorpay webhook starter
- assets/ — your uploaded images

## Automation architecture
Sales Website → Razorpay Payment/Subscription → Razorpay Webhook → Cloudflare Worker → Supabase memberships → Member Dashboard → Zoom Access

## Setup
1. Upload this folder to GitHub.
2. Deploy with Cloudflare.
3. Create a Supabase project.
4. Run supabase-schema.sql.
5. Put Supabase URL + anon key into config.js.
6. Create Razorpay payment/subscription link and add it to config.js.
7. Add Zoom link to config.js.
8. Deploy Cloudflare Worker and add secrets:
   - RAZORPAY_WEBHOOK_SECRET
   - SUPABASE_URL
   - SUPABASE_SERVICE_ROLE_KEY

Never put service role or Razorpay secret keys in GitHub/config.js.
