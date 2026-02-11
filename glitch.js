window.GlitchFX = (() => {
  const overlay = document.getElementById('glitch-overlay');
  const slices = [...overlay.querySelectorAll('.g-slice')];

  function burst() {
    const tl = gsap.timeline();
    tl.set(overlay, { opacity: 1 })
      .to(slices[0], { x: -16, duration: 0.3 })
      .to(slices[1], { x: 14, duration: 0.3 }, '<')
      .to(slices[2], { y: -10, duration: 0.3 }, '<')
      .to(slices, { x: 0, y: 0, duration: 0.3 })
      .to(overlay, { opacity: 0, duration: 0.3 });
    return tl;
  }

  return { burst };
})();
