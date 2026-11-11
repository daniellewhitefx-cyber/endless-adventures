// Same delivery mechanism Fantasy Alive's contact form uses: a stateless,
// unauthenticated Supabase Edge Function that forwards straight to
// logistics@fantasyalivelrp.com. Called with a plain fetch -- no Supabase
// client library, no auth, no backend of our own needed on this site.
const CONTACT_ENDPOINT = 'https://xdchluuvicuuqyqsejnq.supabase.co/functions/v1/send-contact-email';

document.getElementById('footer-year').textContent = new Date().getFullYear();

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

document.getElementById('contact-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const reason = document.getElementById('contact-reason').value;
  const message = document.getElementById('contact-message').value.trim();
  const btn = document.getElementById('contact-submit-btn');
  const msg = document.getElementById('contact-msg');

  msg.textContent = '';
  msg.className = 'contact-msg';
  btn.disabled = true;
  btn.textContent = 'Sending...';

  try {
    const res = await fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, reason, message })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.error) throw new Error(data.error || 'Request failed');

    msg.textContent = 'Message sent! Our team will get back to you as soon as possible.';
    msg.classList.add('success');
    document.getElementById('contact-form').reset();
  } catch (err) {
    msg.textContent = 'Something went wrong sending your message. Please email logistics@fantasyalivelrp.com directly.';
    msg.classList.add('error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Send';
  }
});
