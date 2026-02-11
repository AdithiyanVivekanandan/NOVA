window.Animations = (() => {
  const boot = document.getElementById('boot-screen');
  const main = document.getElementById('main-screen');
  const panel = document.getElementById('login-panel');
  const title = document.getElementById('decode-title');
  const posterMode = document.getElementById('poster-mode');
  const poster = document.getElementById('poster');
  const fragA = document.querySelector('.poster-fragment.layer-a');
  const fragB = document.querySelector('.poster-fragment.layer-b');
  const scan = document.querySelector('.poster-scan');

  function bootToLanding() {
    const tl = gsap.timeline();
    tl.add(window.GlitchFX.burst())
      .to(boot, { opacity: 0, duration: 0.45 })
      .set(boot, { display: 'none' })
      .set(main, { opacity: 1, pointerEvents: 'auto' })
      .from(title, { opacity: 0, scale: 0.96, duration: 0.45 })
      .from(panel, { x: 40, opacity: 0, duration: 0.45 }, '<0.1');
    return tl;
  }

  function decodeConclave() {
    const finalWord = 'CONCLAVE';
    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let frame = 0;
    const total = 24;
    const tick = () => {
      frame += 1;
      const fixed = Math.floor((frame / total) * finalWord.length);
      title.textContent = finalWord
        .split('')
        .map((c, i) => (i < fixed ? c : chars[Math.floor(Math.random() * chars.length)]))
        .join('');
      if (frame >= total) {
        title.textContent = finalWord;
        gsap.ticker.remove(tick);
      }
    };
    gsap.ticker.add(tick);
  }

  function revealPoster() {
    const tl = gsap.timeline();
    tl.add(window.GlitchFX.burst())
      .to(['#landing', '#login-panel'], { x: -80, opacity: 0, duration: 0.5 })
      .set(posterMode, { opacity: 1, pointerEvents: 'auto' })
      .fromTo(posterMode, { opacity: 0 }, { opacity: 1, duration: 0.4 })
      .fromTo(poster, { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 0.5 })
      .fromTo(fragA, { xPercent: -10, opacity: 0.9 }, { xPercent: 0, opacity: 0, duration: 0.5 }, '<')
      .fromTo(fragB, { xPercent: 10, opacity: 0.9 }, { xPercent: 0, opacity: 0, duration: 0.5 }, '<')
      .fromTo(scan, { yPercent: -100, opacity: 1 }, { yPercent: 120, opacity: 0, duration: 0.6 }, '<0.1');
    return tl;
  }

  return { bootToLanding, decodeConclave, revealPoster };
})();
