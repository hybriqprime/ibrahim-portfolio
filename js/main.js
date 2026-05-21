/* ============================================================
   IBRAHIM ISIAQ — PORTFOLIO JAVASCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAV SCROLL ── */
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  /* ── MOBILE BURGER ── */
  const burger = document.querySelector('.nav-burger');
  const mobileNav = document.querySelector('.nav-mobile');
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });

  /* ── SCROLL SPY (close mobile nav) ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── INTERSECTION OBSERVER — FADE IN ── */
  const fadeEls = document.querySelectorAll('.fade-in');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  fadeEls.forEach(el => obs.observe(el));

  /* ── SKILL BAR ANIMATION ── */
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const barObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = el.dataset.width;
        setTimeout(() => { el.style.width = target; }, 200);
        barObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  skillBars.forEach(bar => barObs.observe(bar));

  /* ── COUNTER ANIMATION ── */
  const counters = document.querySelectorAll('.counter');
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        let start = 0;
        const duration = 1600;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) {
            el.textContent = target + suffix;
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(start) + suffix;
          }
        }, 16);
        countObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => countObs.observe(el));

  /* ── CONTACT FORM ── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      const success = form.querySelector('.form-success');
      btn.textContent = 'Sending…';
      btn.disabled = true;
      setTimeout(() => {
        btn.style.display = 'none';
        success.style.display = 'block';
        form.reset();
      }, 1400);
    });
  }

  /* ── PARALLAX on hero bg ── */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      heroBg.style.transform = `translateY(${y * 0.4}px)`;
    });
  }

  /* ── CURSOR GLOW (desktop only) ── */
  if (window.innerWidth > 1024) {
    const glow = document.createElement('div');
    glow.style.cssText = `
      position: fixed;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%);
      pointer-events: none;
      transform: translate(-50%, -50%);
      z-index: 0;
      transition: opacity 0.3s ease;
    `;
    document.body.appendChild(glow);
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    const animateGlow = () => {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      glow.style.left = glowX + 'px';
      glow.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    };
    animateGlow();
  }

});
