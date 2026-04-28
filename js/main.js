/* =============================================
   LuxFrame Studio — main.js
   Funcionalidades: Navbar scroll, Canvas hero,
   Partículas, Counter, Reveal, Tooltips,
   Formulario, Back to top, Modal dinámico, Audio custom
   ============================================= */

'use strict';

/* ─── Inicialización segura tras cargar el DOM ─── */
document.addEventListener('DOMContentLoaded', () => {

  /* ─── Año actual en footer ─── */
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ─── Navbar: cambio de estilo al hacer scroll ─── */
  const mainNav = document.getElementById('mainNav');
  const backToTopBtn = document.getElementById('backToTop');

  const handleScroll = () => {
    // Navbar scrolled
    if (mainNav) {
      mainNav.classList.toggle('scrolled', window.scrollY > 60);
    }
    // Back to Top visibility
    if (backToTopBtn) {
      backToTopBtn.classList.toggle('visible', window.scrollY > 400);
    }
  };

  if (mainNav || backToTopBtn) {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Ejecutar al cargar por si ya hay scroll
  }

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ─── Canvas Hero: Constelación de estrellas ─── */
  (function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, stars;

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      initStars();
    }

    function initStars() {
      const count = Math.floor((W * H) / 8000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.2 + 0.3,
        speed: Math.random() * 0.3 + 0.05,
        opacity: Math.random() * 0.7 + 0.2,
        pulse: Math.random() * Math.PI * 2,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Fondo degradado
      const grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0, '#0d0d18');
      grad.addColorStop(1, '#0a0a12');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Líneas entre estrellas cercanas
      ctx.strokeStyle = 'rgba(200,169,110,0.06)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.globalAlpha = (1 - dist / 120) * 0.15;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
          }
        }
      }

      // Estrellas
      stars.forEach(s => {
        s.y -= s.speed;
        s.pulse += 0.02;
        if (s.y < 0) { s.y = H; s.x = Math.random() * W; }
        const pulsedOpacity = s.opacity * (0.7 + 0.3 * Math.sin(s.pulse));
        ctx.globalAlpha = pulsedOpacity;
        ctx.fillStyle = '#c8a96e';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();
    requestAnimationFrame(draw);
  })();

  /* ─── Canvas Partículas (sección multimedia) ─── */
  (function initParticleCanvas() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, particles;

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = Math.round(W * 9 / 16);
      canvas.height = H;
      initParticles();
    }

    function initParticles() {
      particles = Array.from({ length: 80 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 4 + 1,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        hue: Math.random() * 40 + 30,
        opacity: Math.random() * 0.6 + 0.2,
      }));
    }

    function drawParticles() {
      ctx.fillStyle = 'rgba(13,13,20,0.15)';
      ctx.fillRect(0, 0, W, H);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
        grad.addColorStop(0, `hsla(${p.hue},80%,70%,${p.opacity})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(drawParticles);
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();
    requestAnimationFrame(drawParticles);
  })();

  /* ─── Canvas Proceso (diagrama de flujo) ─── */
  (function initProcessCanvas() {
    const canvas = document.getElementById('processCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    const steps = [
      { label: 'Consulta', x: W / 2, y: 40 },
      { label: 'Planificación', x: W / 2, y: 100 },
      { label: 'Sesión', x: W / 2, y: 160 },
      { label: 'Edición', x: W / 2, y: 220 },
      { label: 'Entrega', x: W / 2, y: 280 },
    ];

    let progress = 0;

    function drawProcess() {
      ctx.clearRect(0, 0, W, H);

      ctx.strokeStyle = 'rgba(200,169,110,0.15)';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(W / 2, 40);
      ctx.lineTo(W / 2, 280);
      ctx.stroke();
      ctx.setLineDash([]);

      const maxY = 40 + (280 - 40) * Math.min(progress / 100, 1);
      ctx.strokeStyle = 'rgba(200,169,110,0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(W / 2, 40);
      ctx.lineTo(W / 2, maxY);
      ctx.stroke();

      steps.forEach((s, i) => {
        const activated = (i / (steps.length - 1)) * 100 <= progress;
        const r = 18;

        if (activated) {
          ctx.strokeStyle = 'rgba(200,169,110,0.2)';
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(s.x - r - 5, s.y);
          ctx.lineTo(s.x - r - 50, s.y);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(s.x + r + 5, s.y);
          ctx.lineTo(s.x + r + 50, s.y);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
        if (activated) {
          const grd = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r);
          grd.addColorStop(0, '#e4c98a');
          grd.addColorStop(1, '#c8a96e');
          ctx.fillStyle = grd;
          ctx.fill();
          ctx.shadowColor = '#c8a96e';
          ctx.shadowBlur = 16;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = '#1a1a28';
          ctx.fill();
          ctx.strokeStyle = 'rgba(200,169,110,0.3)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        ctx.fillStyle = activated ? '#0d0d14' : 'rgba(200,169,110,0.4)';
        ctx.font = `bold 11px 'DM Sans', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(i + 1, s.x, s.y);

        ctx.fillStyle = activated ? '#f0eeea' : 'rgba(240,238,234,0.35)';
        ctx.font = `13px 'DM Sans', sans-serif`;
        ctx.fillText(s.label, s.x + r + 65, s.y);
      });

      if (progress < 100) {
        progress += 0.5;
        requestAnimationFrame(drawProcess);
      }
    }

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        progress = 0;
        requestAnimationFrame(drawProcess);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(canvas);
  })();

  /* ─── Contador de estadísticas ─── */
  (function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = +el.dataset.target;
        const duration = 1600;
        const start = performance.now();

        function update(ts) {
          const elapsed = ts - start;
          const pct = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - pct, 3);
          el.textContent = Math.round(ease * target);
          if (pct < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  })();

  /* ─── Scroll Reveal ─── */
  (function initScrollReveal() {
    const els = document.querySelectorAll(
      '.section-header, .portfolio-card, .testimonial-card, .team-card, .multimedia-card, .audio-card, .stat-item'
    );
    if (!els.length) return;

    els.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    els.forEach(el => observer.observe(el));
  })();

  /* ─── Bootstrap Tooltips ─── */
  (function initTooltips() {
    const tooltipEls = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipEls.forEach(el => new bootstrap.Tooltip(el, { trigger: 'hover focus' }));
  })();

  /* ─── Modal Portfolio dinámico ─── */
  (function initPortfolioModal() {
    const modalEl = document.getElementById('modalPortfolio');
    if (!modalEl) return;

    modalEl.addEventListener('show.bs.modal', e => {
      const trigger = e.relatedTarget;
      if (!trigger) return;
      const category = trigger.dataset.category || '';
      const title = trigger.dataset.title || '';
      const location = trigger.dataset.location || '';

      document.getElementById('modalCategory').textContent = category;
      document.getElementById('modalTitle').textContent = title;
      document.getElementById('modalLocation').textContent = location;
    });
  })();

  /* ─── Formulario de contacto con validación ─── */
  (function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }

      const btn = document.getElementById('btnEnviar');
      const btnText = document.getElementById('btnText');
      btn.disabled = true;
      btnText.textContent = 'Enviando…';

      setTimeout(() => {
        form.reset();
        form.classList.remove('was-validated');
        btn.disabled = false;
        btnText.textContent = 'Enviar mensaje';

        const success = document.getElementById('formSuccess');
        success.classList.remove('d-none');
        success.setAttribute('role', 'alert');
        setTimeout(() => success.classList.add('d-none'), 5000);
      }, 1200);
    });
  })();

  /* ─── Navegación activa según sección ─── */
  (function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${entry.target.id}`
            );
          });
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(s => observer.observe(s));
  })();

  /* ─── Reproductor de audio personalizado ─── */
  (function initCustomAudio() {
    const player = document.querySelector('.custom-audio-player');
    if (!player) return;

    const audio = player.querySelector('audio');
    const playBtn = player.querySelector('.btn-audio-play');
    const icon = playBtn?.querySelector('i');
    const progressBar = player.querySelector('.audio-progress');
    const progressFill = player.querySelector('.audio-progress-bar');
    const timeDisplay = player.querySelector('.audio-time');
    const iconWrapper = player.querySelector('.audio-icon');

    if (!audio || !playBtn || !icon || !progressBar || !progressFill || !timeDisplay) return;

    const fmt = s => {
      if (!s || isNaN(s)) return '0:00';
      return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
    };

    const toggle = () => {
      audio.paused ? audio.play() : audio.pause();
    };

    const updateUI = () => {
      if (!audio.duration) return;
      const pct = (audio.currentTime / audio.duration) * 100;
      progressFill.style.width = `${pct}%`;
      timeDisplay.textContent = `${fmt(audio.currentTime)} / ${fmt(audio.duration)}`;
      progressBar.setAttribute('aria-valuenow', Math.round(pct));
    };

    playBtn.addEventListener('click', toggle);
    playBtn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });

    progressBar.addEventListener('click', e => {
      if (!audio.duration) return;
      const rect = progressBar.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      audio.currentTime = pos * audio.duration;
    });

    progressBar.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const step = e.key === 'ArrowRight' ? 5 : -5;
        audio.currentTime = Math.max(0, Math.min(audio.duration, audio.currentTime + step));
      }
    });

    audio.addEventListener('timeupdate', updateUI);
    audio.addEventListener('loadedmetadata', updateUI);

    audio.addEventListener('play', () => {
      icon.className = 'bi bi-pause-fill';
      playBtn.setAttribute('aria-label', 'Pausar');
      iconWrapper?.classList.add('playing');
    });

    audio.addEventListener('pause', () => {
      icon.className = 'bi bi-play-fill';
      playBtn.setAttribute('aria-label', 'Reproducir');
      iconWrapper?.classList.remove('playing');
    });

    audio.addEventListener('ended', () => {
      icon.className = 'bi bi-play-fill';
      progressFill.style.width = '0%';
      iconWrapper?.classList.remove('playing');
      timeDisplay.textContent = `0:00 / ${fmt(audio.duration)}`;
    });
  })();

}); // ← Fin de DOMContentLoaded