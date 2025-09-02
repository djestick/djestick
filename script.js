// Share and simple glow toggle
const shareBtn = document.getElementById('shareBtn');
const toggle = document.getElementById('themeToggle');

shareBtn?.addEventListener('click', async () => {
  const url = window.location.href;
  try {
    if (navigator.share) {
      await navigator.share({ title: '@djestick', text: 'Links', url });
    } else {
      await navigator.clipboard.writeText(url);
      shareBtn.textContent = '✔';
      setTimeout(() => (shareBtn.textContent = '⇪'), 1400);
    }
  } catch (_) {}
});

toggle?.addEventListener('click', () => {
  document.documentElement.classList.toggle('no-glow');
});

