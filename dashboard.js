const C = window.TRATAK_CONFIG;

if (C.SUPABASE_URL.includes('PASTE')) {
  location = 'login.html';
}

const s = supabase.createClient(
  C.SUPABASE_URL,
  C.SUPABASE_ANON_KEY
);

(async () => {
  const { data: { user } } = await s.auth.getUser();

  if (!user) {
    location = 'login.html';
    return;
  }

  const { data, error } = await s
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  console.log('Profile:', data, error);

  if (error || !data) {
    status.textContent = 'Inactive';
    access.textContent = 'No active membership found.';
    return;
  }

  status.textContent = data.membership_status;

  if (data.membership_status === 'active') {
    status.textContent = 'Active';
    zoom.style.display = 'inline-block';
    zoom.href = C.ZOOM_JOIN_URL;
    access.textContent = 'Your membership is active. You can join the live session.';
  } else {
    status.textContent = 'Inactive';
    access.textContent = 'No active membership found.';
  }
})();

logout.onclick = async () => {
  await s.auth.signOut();
  location = 'index.html';
};
