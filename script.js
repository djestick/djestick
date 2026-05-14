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

const heroFrame = document.querySelector('.hero-frame');

if (heroFrame) {
  const frameCount = 101;
  const frameRate = 24;
  const frameDuration = 1000 / frameRate;
  const framePath = (index) =>
    `assets/hero-frames/frame_${String(index).padStart(5, '0')}.png`;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let frameIndex = 0;
  let lastFrameTime = 0;

  const frames = Array.from({ length: frameCount }, (_, index) => {
    const image = new Image();
    image.src = framePath(index);
    return image;
  });

  const playHeroFrames = (time) => {
    if (time - lastFrameTime >= frameDuration) {
      frameIndex = (frameIndex + 1) % frameCount;
      heroFrame.src = frames[frameIndex].src;
      lastFrameTime = time;
    }

    requestAnimationFrame(playHeroFrames);
  };

  if (!reduceMotion.matches) {
    requestAnimationFrame(playHeroFrames);
  }
}
