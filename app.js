(() => {
  const halo = document.getElementById('cursor-halo');
  const title = document.getElementById('decode-title');
  const logs = document.getElementById('left-logs');
  const alertFeed = document.getElementById('alert-feed');
  const poster = document.getElementById('poster');
  const canvas = document.getElementById('signal-wave');
  const ctx = canvas.getContext('2d');

  const landingTilt = { x: 0, y: 0 };

  function initCursorHalo() {
    window.addEventListener('pointermove', (e) => {
      gsap.to(halo, { left: e.clientX, top: e.clientY, duration: 0.4 });
      landingTilt.x = ((e.clientX / window.innerWidth) - 0.5) * 10;
      landingTilt.y = ((e.clientY / window.innerHeight) - 0.5) * 8;
      gsap.to(title, { x: landingTilt.x, y: landingTilt.y, duration: 0.35 });
    });
  }

  function seedLogs() {
    const entries = [
      ':: NODE SESSION 771.A INITIALIZED',
      ':: LATENCY 12MS // STABLE',
      ':: SAT-LINK UPLINK ROUTED',
      ':: PAYLOAD SIGNATURE AUTHENTIC',
      ':: SHADOW CHANNEL OPEN'
    ];
    logs.innerHTML = entries.map((l) => `&gt; ${l}`).join('<br>');
  }

  function loopWave() {
    let t = 0;
    const draw = () => {
      t += 0.06;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#00E5FF';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let y = 0; y < canvas.height; y += 3) {
        const x = canvas.width / 2 + Math.sin((y * 0.06) + t) * 26 + Math.sin((y * 0.015) + t * 2) * 14;
        if (y === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      requestAnimationFrame(draw);
    };
    draw();
  }

  function ambientAlerts() {
    const fire = () => {
      alertFeed.textContent = 'UNAUTHORIZED SIGNAL DETECTED';
      gsap.fromTo(alertFeed, { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: 0.34 });
      gsap.to(alertFeed, { opacity: 0, duration: 0.5, delay: 3.4 });
      const next = 12000 + Math.random() * 8000;
      setTimeout(fire, next);
    };
    setTimeout(fire, 13000);
  }

  function ambientPosterMotion() {
    window.addEventListener('pointermove', (e) => {
      const x = ((e.clientX / window.innerWidth) - 0.5) * 16;
      const y = ((e.clientY / window.innerHeight) - 0.5) * 12;
      gsap.to(poster, { x, y, duration: 0.55 });
    });
    gsap.to(poster, { y: '-=8', duration: 2.2, yoyo: true, repeat: -1, ease: 'sine.inOut' });
  }

  async function initFlow() {
    initCursorHalo();
    window.GlitchFX.burst();
    window.Animations.decodeConclave();
    await new Promise((r) => setTimeout(r, 2500));
    window.Animations.bootToLanding();
  }

  window.addEventListener('login:success', () => {
    window.Animations.revealPoster();
    seedLogs();
    loopWave();
    ambientAlerts();
    ambientPosterMotion();
  });

  initFlow();
})();
