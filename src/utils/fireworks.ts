import confetti from 'canvas-confetti';

export function triggerWeddingFireworks() {
  // 1. Initial explosive multi-color fireworks burst from center
  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
      disableForReducedMotion: false,
      zIndex: 9999
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#f59e0b', '#fbbf24', '#fef08a', '#10b981', '#f43f5e']
  });
  fire(0.2, {
    spread: 60,
    colors: ['#fbbf24', '#ec4899', '#34d399', '#fb7185']
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#ffd700', '#f43f5e', '#10b981', '#ffffff']
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    shapes: ['star', 'circle'],
    colors: ['#fbbf24', '#f472b6', '#38bdf8']
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#ffd700', '#fb7185', '#34d399']
  });

  // 2. Continuous fireworks cannons shooting from left & right sides for 3 seconds
  const end = Date.now() + 3500;
  const colors = ['#f59e0b', '#10b981', '#f43f5e', '#ffd700', '#ffffff'];

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.8 },
      colors: colors,
      zIndex: 9999
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.8 },
      colors: colors,
      zIndex: 9999
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
