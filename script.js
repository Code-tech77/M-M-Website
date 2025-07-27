// Mobile-first, responsive, and interactive SPA for M&M Web Solutions
// Now with full dark/light mode responsiveness for mobile

// --- Mobile Navigation Toggle ---
// Place theme toggle icon centered under navigation for mobile
(function setupMobileNav() {
  if (!document.querySelector('.mobile-nav-toggle')) {
    const header = document.querySelector('.header');
    const nav = document.querySelector('.nav');
    const themeToggle = document.querySelector('.theme-toggle');
    const btn = document.createElement('button');
    btn.className = 'mobile-nav-toggle';
    btn.setAttribute('aria-label', 'Open navigation menu');
    btn.innerHTML = '<span></span><span></span><span></span>';
    header.insertBefore(btn, nav);

    // --- THEME TOGGLE CENTERED UNDER NAVIGATION LOGIC ---
    function placeThemeToggleCenteredMobile() {
      if (!themeToggle) return;
      // Only center on mobile (max-width: 768px)
      if (window.innerWidth <= 768) {
        // Create a wrapper if not present
        let wrapper = document.querySelector('.theme-toggle-mobile-center');
        if (!wrapper) {
          wrapper = document.createElement('div');
          wrapper.className = 'theme-toggle-mobile-center';
          wrapper.style.display = 'flex';
          wrapper.style.justifyContent = 'center';
          wrapper.style.marginTop = '1rem';
          wrapper.style.width = '100%';
        }
        // Move themeToggle into wrapper
        if (themeToggle.parentElement !== wrapper) {
          wrapper.appendChild(themeToggle);
        }
        // Insert wrapper after nav if not already there
        if (nav.nextSibling !== wrapper) {
          if (nav.nextSibling) {
            header.insertBefore(wrapper, nav.nextSibling);
          } else {
            header.appendChild(wrapper);
          }
        }
        themeToggle.classList.add('theme-toggle-centered-mobile');
      } else {
        // Remove wrapper and place themeToggle after nav in header
        let wrapper = document.querySelector('.theme-toggle-mobile-center');
        if (wrapper && wrapper.contains(themeToggle)) {
          wrapper.removeChild(themeToggle);
          if (nav.nextSibling) {
            header.insertBefore(themeToggle, nav.nextSibling);
          } else {
            header.appendChild(themeToggle);
          }
          wrapper.remove();
        } else if (themeToggle.parentElement !== header || themeToggle.previousElementSibling !== nav) {
          if (nav.nextSibling) {
            header.insertBefore(themeToggle, nav.nextSibling);
          } else {
            header.appendChild(themeToggle);
          }
        }
        themeToggle.classList.remove('theme-toggle-centered-mobile');
      }
    }

    btn.addEventListener('click', () => {
      nav.classList.toggle('nav-open');
      btn.classList.toggle('open');
      document.body.classList.toggle('nav-overlay');
      // Always keep theme toggle centered under nav on mobile
      placeThemeToggleCenteredMobile();
    });

    nav.addEventListener('click', e => {
      if (e.target.tagName === 'A' && nav.classList.contains('nav-open')) {
        nav.classList.remove('nav-open');
        btn.classList.remove('open');
        document.body.classList.remove('nav-overlay');
        // Always keep theme toggle centered under nav on mobile
        placeThemeToggleCenteredMobile();
      }
    });

    // On resize, always keep theme toggle centered under nav on mobile
    window.addEventListener('resize', () => {
      placeThemeToggleCenteredMobile();
    });

    // On initial load, ensure correct placement
    window.addEventListener('DOMContentLoaded', () => {
      placeThemeToggleCenteredMobile();
    });
  }
})();

// --- Touch-friendly FAB (Floating Action Button) ---
(function setupFAB() {
  const fab = document.getElementById('fab-btn');
  if (fab) {
    fab.addEventListener('touchstart', e => {
      fab.classList.add('fab-active');
    });
    fab.addEventListener('touchend', e => {
      fab.classList.remove('fab-active');
      fab.click();
    });
    fab.addEventListener('click', () => {
      if (window.innerWidth < 700) {
        if (window.location.hash !== '#contact') {
          window.location.hash = '#contact';
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
})();

// --- Responsive font scaling ---
(function setupResponsiveFont() {
  function setFont() {
    const size = Math.max(15, Math.min(18, window.innerWidth / 24));
    document.documentElement.style.fontSize = size + 'px';
  }
  setFont();
  window.addEventListener('resize', setFont);
})();

// --- Touch-friendly theme toggle ---
(function setupThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('touchend', e => {
      e.preventDefault();
      themeToggle.click();
    });
  }
})();

// --- Mobile accessibility: focus main content on navigation ---
(function setupMobileFocus() {
  window.addEventListener('hashchange', () => {
    setTimeout(() => {
      const main = document.getElementById('spa-content');
      if (main) main.focus();
    }, 200);
  });
})();

// --- Mobile-specific CSS injection with full dark/light mode support ---
(function injectMobileCSS() {
  if (!document.getElementById('mm-mobile-style')) {
    const style = document.createElement('style');
    style.id = 'mm-mobile-style';
    style.textContent = `
      /* Mobile nav hamburger */
      .mobile-nav-toggle {
        display: none;
        background: none;
        border: none;
        flex-direction: column;
        gap: 5px;
        width: 40px;
        height: 40px;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 1002;
      }
      .mobile-nav-toggle span {
        display: block;
        width: 28px;
        height: 3px;
        background: #333;
        border-radius: 2px;
        transition: all 0.3s;
      }
      [data-theme="dark"] .mobile-nav-toggle span {
        background: #eaf1fa;
      }
      .mobile-nav-toggle.open span:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
      }
      .mobile-nav-toggle.open span:nth-child(2) {
        opacity: 0;
      }
      .mobile-nav-toggle.open span:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
      }
      @media (max-width: 700px) {
        .nav {
          position: fixed;
          top: 0; right: 0;
          background: var(--nav-bg, #fff);
          height: 100vh;
          width: 80vw;
          max-width: 320px;
          box-shadow: -2px 0 16px rgba(0,0,0,0.08);
          transform: translateX(100%);
          transition: transform 0.3s;
          flex-direction: column;
          align-items: flex-start;
          padding: 4rem 2rem 2rem 2rem;
          z-index: 1001;
        }
        [data-theme="dark"] .nav {
          background: var(--nav-bg, #181f2a);
          box-shadow: -2px 0 16px rgba(30,126,214,0.13);
        }
        .nav.nav-open {
          transform: translateX(0);
        }
        .mobile-nav-toggle {
          display: flex;
        }
        body.nav-overlay::before {
          content: '';
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.18);
          z-index: 1000;
        }
        .header {
          position: sticky;
          top: 0;
          z-index: 1003;
          background: var(--header-bg, #fff);
        }
        [data-theme="dark"] .header {
          background: var(--header-bg, #181f2a);
        }
        /* Center the theme toggle under nav on mobile */
        .theme-toggle-mobile-center {
          display: flex !important;
          justify-content: center !important;
          margin-top: 1rem !important;
          width: 100% !important;
        }
        .theme-toggle-centered-mobile {
          display: flex !important;
          margin: 0 auto !important;
          left: 0 !important;
          right: 0 !important;
          position: static !important;
          transform: none !important;
        }
        .header > .theme-toggle {
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
        .nav .theme-toggle {
          margin-top: 0 !important;
        }
      }
      /* FAB touch feedback */
      #fab-btn.fab-active {
        background: #e0e0e0;
        box-shadow: 0 2px 12px rgba(0,0,0,0.12);
        transform: scale(1.08);
      }
      [data-theme="dark"] #fab-btn.fab-active {
        background: #232b3a;
        box-shadow: 0 2px 12px rgba(30,126,214,0.13);
      }
      /* Make popups and overlays mobile-friendly */
      #achievement-popup, #progress-bar, #logo-loader {
        max-width: 95vw;
        left: 2.5vw !important;
        right: 2.5vw !important;
      }
      /* Responsive images and containers */
      img, video, svg {
        max-width: 100%;
        height: auto;
      }
      .logo, .logo-loader-img {
        width: 48px;
        height: 48px;
      }
      /* Main content padding for mobile */
      @media (max-width: 700px) {
        #spa-content {
          padding: 1.2rem 0.5rem 2.5rem 0.5rem;
        }
      }
      /* Mobile-specific dark mode for popups and overlays */
      [data-theme="dark"] #achievement-popup,
      [data-theme="dark"] #logo-loader {
        background: #232b3a !important;
        color: #eaf1fa !important;
        box-shadow: 0 2px 12px 0 rgba(30,126,214,0.13) !important;
      }
      [data-theme="dark"] #progress-bar {
        background: #1e7ed6 !important;
      }
      /* Responsive contact form dark mode */
      [data-theme="dark"] .minimal-contact-form input,
      [data-theme="dark"] .minimal-contact-form textarea {
        background: #232b3a;
        color: #eaf1fa;
        border-color: #1e7ed6;
      }
      [data-theme="dark"] .minimal-contact-form label {
        color: #7ecbff;
      }
      [data-theme="dark"] .minimal-contact-form button {
        background: #1e7ed6;
        color: #fff;
      }
      /* Responsive contact links dark mode */
      [data-theme="dark"] .contact-link {
        color: #7ecbff;
      }
      /* Responsive features dark mode */
      [data-theme="dark"] .home-features li {
        background: rgba(30,126,214,0.13);
        color: #eaf1fa;
      }
      /* Responsive package card dark mode */
      @media (max-width: 700px) {
        [data-theme="dark"] .modern-package-card {
          background: #181f2a !important;
          color: #eaf1fa !important;
          border: 1.5px solid rgba(30,126,214,0.18) !important;
          box-shadow: 0 4px 24px 0 rgba(30,126,214,0.13) !important;
        }
        [data-theme="dark"] .modern-package-title {
          color: #eaf1fa !important;
        }
        [data-theme="dark"] .modern-package-price {
          color: #7ecbff !important;
        }
        [data-theme="dark"] .modern-package-list li {
          color: #fff !important;
        }
      }
      /* Responsive loop slider dark mode */
      [data-theme="dark"] .loop-slide {
        background: rgba(30,126,214,0.13) !important;
        color: #eaf1fa !important;
        box-shadow: 0 2px 8px 0 rgba(30,126,214,0.13) !important;
      }
      /* Responsive deposit marquee dark mode */
      [data-theme="dark"] .deposit-marquee-inner {
        background: rgba(30,126,214,0.13) !important;
        color: #7ecbff !important;
        box-shadow: 0 2px 8px 0 rgba(30,126,214,0.13) !important;
      }
    `;
    document.head.appendChild(style);
  }
})();
const html = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const THEME_KEY = 'mm-theme';

// --- Responsive helper: injects a meta viewport and responsive CSS if not present ---
(function ensureResponsive() {
  if (!document.querySelector('meta[name="viewport"]')) {
    const meta = document.createElement('meta');
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1.0";
    document.head.appendChild(meta);
  }
  if (!document.getElementById('mm-responsive-style')) {
    const style = document.createElement('style');
    style.id = 'mm-responsive-style';
    style.textContent = `
      html, body {
        max-width: 100vw;
        overflow-x: hidden;
      }
      .minimal-hero-content, .minimal-contact, .footer, .modern-packages-list, .pricing-section-anim, .home-cta, .deposit-marquee-modern {
        box-sizing: border-box;
        width: 100%;
        max-width: 100vw;
      }
      .modern-packages-list {
        max-width: 480px;
        width: 100%;
        padding: 0 1rem;
      }
      .modern-package-card {
        width: 100% !important;
        max-width: 370px !important;
        min-width: 0;
      }
      .loop-slider-inner {
        flex-wrap: nowrap;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        padding: 1.2rem 0;
        gap: 1.2rem !important;
      }
      .loop-slide {
        min-width: 140px;
        font-size: 1rem;
        white-space: nowrap;
        transition: background 0.22s, color 0.22s, box-shadow 0.22s, transform 0.22s, opacity 0.22s;
      }
      .home-features {
        flex-wrap: wrap;
        gap: 0.7em 1.2em;
        padding: 0;
      }
      .home-features li {
        min-width: 120px;
        font-size: 1rem;
        margin-bottom: 0.3em;
        overflow: hidden;
        position: relative;
      }
      .minimal-contact-form {
        width: 100%;
        max-width: 420px;
        margin: 0 auto;
        padding: 0 1rem;
      }
      .contact-methods {
        flex-direction: column;
        gap: 0.7em;
        width: 100%;
      }
      .contact-link {
        font-size: 1rem;
        word-break: break-all;
      }
      .footer {
        font-size: 0.95rem;
        padding: 1.2em 0;
      }
      @media (max-width: 600px) {
        .minimal-hero-content, .minimal-contact, .footer, .modern-packages-list, .pricing-section-anim, .home-cta, .deposit-marquee-modern {
          padding-left: 0.5rem !important;
          padding-right: 0.5rem !important;
        }
        .modern-packages-list {
          max-width: 100vw;
          padding: 0 0.2rem;
        }
        .modern-package-card {
          max-width: 98vw !important;
          padding: 1.1rem 0.7rem !important;
        }
        .flip-cards-title {
          font-size: 1.1rem !important;
        }
        .loop-slide {
          min-width: 110px;
          font-size: 0.95rem;
        }
        .home-features li {
          min-width: 90px;
          font-size: 0.95rem;
        }
        .minimal-contact-form {
          max-width: 98vw;
          padding: 0 0.2rem;
        }
      }
    `;
    document.head.appendChild(style);
  }
})();

function setTheme(theme, save = true) {
  html.setAttribute('data-theme', theme);
  if (save) localStorage.setItem(THEME_KEY, theme);
  updatePackageCardThemes(theme);
  updateFeatureTheme(theme);
  // On mobile, update nav and overlays for theme
  if (window.innerWidth < 700) {
    // Force reflow of nav and overlays for theme
    document.querySelectorAll('.nav, .header, #achievement-popup, #logo-loader, #progress-bar, .modern-package-card, .loop-slide, .deposit-marquee-inner').forEach(el => {
      el && (el.style.transition = 'background 0.18s, color 0.18s, box-shadow 0.18s');
    });
  }
}
function getPreferredTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
function toggleTheme() {
  const current = html.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
}
themeToggle.addEventListener('click', toggleTheme);
setTheme(getPreferredTheme(), false);

const navLinks = document.querySelectorAll('.nav a[data-page]');
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const page = link.getAttribute('data-page');
    loadPage(page);
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// --- Modernized Package Data ---
const packageData = [
  {
    name: "Basic",
    price: "£50",
    details: [
      "2 – 3 PAGES",
      "MOBILE-FRIENDLY",
      "FROM 0 – 20 ITEM LIST",
      "1 REVISION INCLUDED",
      "DELIVERY WITHIN 1 – 2"
    ]
  },
  {
    name: "Standard",
    price: "£99",
    details: [
      "5 – 7 PAGES",
      "MOBILE-FRIENDLY",
      "UP TO 25 – 50 ITEM LIST",
      "3 REVISION INCLUDED",
      "DELIVERY WITHIN 3 – 4"
    ]
  },
  {
    name: "Professional",
    price: "£220",
    details: [
      "8 – 10 PAGES",
      "MOBILE-FRIENDLY",
      "UP TO 50 – 150 ITEM LIST",
      "SET UP THE DOMAIN",
      "DELIVERY WITHIN 7 – 14"
    ]
  }
];

const featureSlides = [
  { icon: "🚀", text: "Security First" },
  { icon: "🎨", text: "UI/UX Design" },
  { icon: "🔒", text: "Reliable" },
  { icon: "💡", text: "Innovative" },
  { icon: "🤝", text: "Supportive" }
];

const pages = {
  home: `
    <section class="hero minimal-hero">
      <div class="minimal-hero-content">
        <h1 class="hero-title" id="animated-hero-title">M&M Freelance Web Developer & UI/UX Designer</h1>
        <div class="home-intro-anim">
          <p class="hero-tagline">Modern web development and UI/UX design for ambitious businesses.<br>We create digital experiences that drive results.</p>
          <ul class="home-features" id="home-features-list">
            <li data-feature="0"><span class="feature-icon">🚀</span> <span class="feature-label">Fast Delivery</span></li>
            <li data-feature="1"><span class="feature-icon">🎨</span> <span class="feature-label">Custom UI/UX</span></li>
            <li data-feature="2"><span class="feature-icon">🔒</span> <span class="feature-label">Secure & Reliable</span></li>
            <li data-feature="3"><span class="feature-icon">💡</span> <span class="feature-label">Innovative Solutions</span></li>
            <li data-feature="4"><span class="feature-icon">🤝</span> <span class="feature-label">Client Support</span></li>
          </ul>
        </div>
        <div class="loop-slider-modern" style="margin: 3.5rem 0 2.5rem 0;">
          <div class="loop-slider-inner" id="loop-slider-inner" style="display:flex;gap:2.5rem;align-items:center;overflow-x:auto;padding:1.2rem 0;">
            <!-- Slides will be rendered by JS for animation -->
          </div>
        </div>
        <div class="pricing-section-anim" style="margin-top:2.5rem;">
          <h2 class="flip-cards-title" style="text-align:center;margin-bottom:2.2rem;font-size:1.35rem;font-weight:800;letter-spacing:0.01em;">Service Plan<br><span style='font-size:2.1rem;font-weight:900;'>Web Development</span></h2>
          <div class="modern-packages-list" id="modern-packages-list" style="display:flex;flex-direction:column;gap:2.2rem;align-items:center;max-width:480px;margin:0 auto 2.5rem auto;">
            <!-- Package cards will be rendered here by JS -->
          </div>
          <div class="deposit-marquee-modern" aria-label="Deposit notice" style="margin-top:2.5rem;text-align:center;">
            <span class="deposit-marquee-inner" style="display:inline-block;background:rgba(30,126,214,0.08);border-radius:1.2em;padding:0.5em 1.5em;font-weight:600;color:#0056a6;font-size:1.08rem;box-shadow:0 2px 8px 0 rgba(30,126,214,0.07);">📌 30% deposit required to confirm the service.</span>
          </div>
        </div>
        <div class="home-cta" style="margin-top:3.5rem;">
          <a href="#contact" class="cta-btn">Contact Us</a>
        </div>
      </div>
    </section>
    <footer class="footer minimal-footer"><p>&copy; 2025 M&M Freelancers. All rights reserved.</p></footer>
  `,
  contact: `
    <section id="contact" class="minimal-contact">
      <h2 class="hero-title">Contact Us</h2>
      <p class="minimal-contact-intro">Let’s work together. Reach out via  email or Instagram, or use the form below. We’ll respond within 24 hours.</p>
      <div class="contact-methods">
        <a href="mailto:mm.freelancers2025@gmail.com" class="contact-link email" aria-label="Email"><span class="contact-icon">✉️</span> mm.freelancers2025@gmail.com
</a>
        <a href="https://instagram.com/mm.freelancers" class="contact-link instagram" target="_blank" rel="noopener" aria-label="Instagram"><span class="contact-icon">📸</span> Instagram: @mm.freelancers</a>
      </div>
      <form class="minimal-contact-form" autocomplete="off" novalidate>
        <div class="form-group">
          <span class="input-icon" aria-hidden="true">👤</span>
          <input id="contact-name" name="name" type="text" required placeholder=" " autocomplete="off" />
          <label for="contact-name">Your Name</label>
        </div>
        <div class="form-group">
          <span class="input-icon" aria-hidden="true">📧</span>
          <input id="contact-email" name="email" type="email" required placeholder=" " autocomplete="off" />
          <label for="contact-email">Your Email</label>
        </div>
        <div class="form-group">
          <span class="input-icon" aria-hidden="true">💬</span>
          <textarea id="contact-message" name="message" required placeholder=" " rows="4"></textarea>
          <label for="contact-message">How can we help you?</label>
        </div>
        <button type="submit">Send Message</button>
      </form>
      <div class="contact-details minimal-contact-details">
        <p class="privacy-note">Your message is confidential and will be handled with care.</p>
      </div>
    </section>
    <footer class="footer minimal-footer"><p>&copy; 2025 M&M Freelancers. All rights reserved.</p></footer>
  `
};

const spaContent = document.getElementById('spa-content');
const logoLoader = document.getElementById('logo-loader');
const progressBar = document.getElementById('progress-bar');
const achievementPopup = document.getElementById('achievement-popup');

let visitedPages = JSON.parse(localStorage.getItem('mm-visited-pages') || '{}');

function showLogoLoader() {
  logoLoader.classList.add('active');
}
function hideLogoLoader() {
  logoLoader.classList.remove('active');
}
function updateProgressBar() {
  const total = Object.keys(pages).length;
  const visited = Object.keys(visitedPages).length;
  progressBar.style.width = `${(visited / total) * 100}%`;
}
function showAchievement(msg) {
  achievementPopup.textContent = msg;
  achievementPopup.classList.add('active');
  confetti();
  setTimeout(() => achievementPopup.classList.remove('active'), 3500);
}
function confetti() {
  const conf = document.createElement('div');
  conf.style.position = 'fixed';
  conf.style.left = '50%';
  conf.style.top = '50%';
  conf.style.fontSize = '2rem';
  conf.style.pointerEvents = 'none';
  conf.style.zIndex = 2000;
  conf.textContent = '🎉✨';
  document.body.appendChild(conf);
  setTimeout(() => conf.remove(), 1200);
}

// --- Pricing card animation logic ---
function addPricingCardAnimations() {
  if (window.gsap) {
    gsap.fromTo('.home-intro-anim', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power2.out' });
    gsap.fromTo('.pricing-section-anim', { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, delay: 0.2, ease: 'back.out(1.7)' });
    gsap.fromTo('.modern-package-card', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.18, delay: 0.3, ease: 'power2.out' });
    gsap.fromTo('.loop-slider-modern', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.15, ease: 'power2.out' });
  }
}

// --- Modern Package Card Interactivity with Theme Awareness ---
function getCardThemeStyles(theme) {
  if (theme === 'dark') {
    return {
      bg: '#181f2a',
      border: '1.5px solid rgba(30,126,214,0.18)',
      color: '#eaf1fa',
      shadow: '0 4px 24px 0 rgba(30,126,214,0.13)'
    };
  }
  return {
    bg: '#fff',
    border: '1.5px solid rgba(30,126,214,0.07)',
    color: '#0056a6',
    shadow: '0 4px 24px 0 rgba(30,126,214,0.08)'
  };
}

function updatePackageCardThemes(theme) {
  const cards = document.querySelectorAll('.modern-package-card');
  const styles = getCardThemeStyles(theme);
  cards.forEach(card => {
    card.style.background = styles.bg;
    card.style.border = styles.border;
    card.style.boxShadow = styles.shadow;
    card.style.color = styles.color;
    const price = card.querySelector('.modern-package-price');
    if (price) price.style.color = theme === 'dark' ? '#7ecbff' : '#1e7ed6';
    const title = card.querySelector('.modern-package-title');
    if (title) title.style.color = styles.color;
    const detailsList = card.querySelectorAll('.modern-package-list li');
    detailsList.forEach(li => {
      li.style.color = theme === 'dark' ? '#fff' : '#000';
    });
  });
}

// --- REWRITE: Feature theme color logic for loop slider (Security First, UI/UX Design, Reliable, Innovative, Supportive) ---
// Always set text color to black for these slides, regardless of theme
function updateLoopSliderFeatureColors() {
  const slider = document.getElementById('loop-slider-inner');
  if (!slider) return;
  // Only target the slides with the specific text
  const blackTextFeatures = [
    "Security First",
    "UI/UX Design",
    "Reliable",
    "Innovative",
    "Supportive"
  ];
  slider.querySelectorAll('.loop-slide').forEach(slide => {
    // Check if the slide text matches any of the features
    for (const feature of blackTextFeatures) {
      if (slide.textContent.trim().endsWith(feature)) {
        slide.style.color = "#000";
        break;
      }
    }
  });
}

function renderModernPackages() {
  const container = document.getElementById('modern-packages-list');
  if (!container) return;
  container.innerHTML = '';
  const theme = html.getAttribute('data-theme') || getPreferredTheme();
  const styles = getCardThemeStyles(theme);

  packageData.forEach((pkg, idx) => {
    const card = document.createElement('div');
    card.className = 'modern-package-card';
    card.setAttribute('tabindex', '0');
    card.setAttribute('data-idx', idx);
    card.style.cssText = `
      width:100%;max-width:370px;background:${styles.bg};border-radius:1.5rem;box-shadow:${styles.shadow};
      padding:1.6rem 2.1rem;cursor:pointer;transition:box-shadow .18s,transform .18s,background .18s,color .18s;
      display:flex;flex-direction:column;align-items:flex-start;gap:0.7rem;
      border:${styles.border};
      color:${styles.color};
      position:relative;
    `;
    card.innerHTML = `
      <div class="modern-package-title" style="font-size:1.25rem;font-weight:700;letter-spacing:0.01em;color:${styles.color};display:flex;align-items:center;gap:0.5em;">
        <span>${pkg.name}</span>
        <span class="modern-package-arrow" style="margin-left:auto;font-size:1.2em;transition:transform .18s;">▼</span>
      </div>
      <div class="modern-package-details" style="display:none;width:100%;margin-top:0.7rem;">
        <div class="modern-package-price" style="font-size:1.15rem;font-weight:600;color:${theme === 'dark' ? '#7ecbff' : '#1e7ed6'};margin-bottom:0.7rem;">${pkg.price}</div>
        <ul class="modern-package-list" style="list-style:none;padding:0;margin:0 0 0 0.1em;display:flex;flex-direction:column;gap:0.4em;">
          ${pkg.details.map(d => `<li style="font-size:1.01rem;color:${theme === 'dark' ? '#fff' : '#000'};opacity:0.85;">${d}</li>`).join('')}
        </ul>
        <button class="select-plan-btn-modern" style="margin-top:1.1rem;padding:0.6em 1.5em;font-size:1.05rem;font-weight:600;background:${theme === 'dark' ? '#1e7ed6' : '#1e7ed6'};color:#fff;border:none;border-radius:0.7em;box-shadow:0 2px 8px 0 rgba(30,126,214,0.07);cursor:pointer;transition:background .18s;">SELECT PLAN</button>
      </div>
    `;
    container.appendChild(card);
  });

  container.querySelectorAll('.modern-package-card').forEach(card => {
    card.addEventListener('click', function(e) {
      if (e.target.classList.contains('select-plan-btn-modern')) return;
      const details = card.querySelector('.modern-package-details');
      const arrow = card.querySelector('.modern-package-arrow');
      const isOpen = details.style.display === 'block';
      container.querySelectorAll('.modern-package-details').forEach(d => d.style.display = 'none');
      container.querySelectorAll('.modern-package-arrow').forEach(a => a.style.transform = 'rotate(0deg)');
      if (!isOpen) {
        details.style.display = 'block';
        arrow.style.transform = 'rotate(180deg)';
        card.style.boxShadow = theme === 'dark'
          ? '0 8px 32px 0 rgba(30,126,214,0.23)'
          : '0 8px 32px 0 rgba(30,126,214,0.13)';
        card.style.transform = 'translateY(-2px) scale(1.025)';
        if (window.gsap) {
          gsap.fromTo(details, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
        }
      } else {
        details.style.display = 'none';
        arrow.style.transform = 'rotate(0deg)';
        card.style.boxShadow = styles.shadow;
        card.style.transform = 'none';
      }
      container.querySelectorAll('.modern-package-card').forEach(other => {
        if (other !== card) {
          other.style.boxShadow = styles.shadow;
          other.style.transform = 'none';
        }
      });
    });
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
    card.addEventListener('mouseenter', function() {
      card.style.boxShadow = theme === 'dark'
        ? '0 8px 32px 0 rgba(30,126,214,0.23)'
        : '0 8px 32px 0 rgba(30,126,214,0.13)';
      card.style.transform = 'scale(1.018)';
    });
    card.addEventListener('mouseleave', function() {
      card.style.boxShadow = styles.shadow;
      card.style.transform = 'none';
    });
  });
}

// --- REWRITE: Feature theme color logic for home features (ul.home-features) ---
// Always set text color to black for these features, regardless of theme
function updateFeatureTheme(theme) {
  const features = document.querySelectorAll('.home-features .feature-icon, .home-features .feature-label');
  features.forEach(el => {
    el.style.color = '#000';
  });
}

// --- Interactive Features Animation ---
function animateHomeFeatures() {
  const features = document.querySelectorAll('#home-features-list li');
  features.forEach((li, idx) => {
    li.style.cursor = 'pointer';
    li.style.transition = 'background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.18s';

    if (window.gsap) {
      gsap.fromTo(
        li,
        { opacity: 0, y: 40, scale: 0.92, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.85,
          delay: 0.2 + idx * 0.13,
          ease: "power3.out"
        }
      );
    }

    const icon = li.querySelector('.feature-icon');
    const label = li.querySelector('.feature-label');
    if (window.gsap && icon && label) {
      gsap.fromTo(
        icon,
        { scale: 0.2, opacity: 0, x: -18, rotate: -30 },
        {
          scale: 1.18,
          opacity: 1,
          x: 0,
          rotate: 0,
          duration: 0.7,
          delay: 0.32 + idx * 0.13,
          ease: "back.out(2.2)"
        }
      );
      gsap.fromTo(
        label,
        { opacity: 0, x: 18, y: 10, scale: 0.8, filter: "blur(4px)" },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.7,
          delay: 0.42 + idx * 0.13,
          ease: "power2.out"
        }
      );
    }

    li.addEventListener('mouseenter', () => {
      if (html.getAttribute('data-theme') === 'dark') {
        li.style.background = 'rgba(30,126,214,0.13)';
        li.style.boxShadow = '0 2px 12px 0 rgba(30,126,214,0.13)';
      } else {
        li.style.background = 'rgba(30,126,214,0.08)';
        li.style.boxShadow = '0 2px 12px 0 rgba(30,126,214,0.10)';
      }
      li.style.transform = 'scale(1.06)';
      if (window.gsap) {
        gsap.to(icon, { scale: 1.28, rotate: 10, duration: 0.28, ease: 'power2.out' });
        gsap.to(label, { scale: 1.06, color: "#000", duration: 0.22, ease: "power2.out" });
      }
    });
    li.addEventListener('mouseleave', () => {
      li.style.background = 'none';
      li.style.boxShadow = 'none';
      li.style.transform = 'none';
      if (window.gsap) {
        gsap.to(icon, { scale: 1, rotate: 0, duration: 0.3, ease: 'power2.out' });
        gsap.to(label, { scale: 1, color: "#000", duration: 0.22, ease: "power2.out" });
      }
    });
    li.addEventListener('focus', () => {
      if (html.getAttribute('data-theme') === 'dark') {
        li.style.background = 'rgba(30,126,214,0.13)';
        li.style.boxShadow = '0 2px 12px 0 rgba(30,126,214,0.13)';
      } else {
        li.style.background = 'rgba(30,126,214,0.08)';
        li.style.boxShadow = '0 2px 12px 0 rgba(30,126,214,0.10)';
      }
      li.style.transform = 'scale(1.06)';
      if (window.gsap) {
        gsap.to(icon, { scale: 1.28, rotate: 10, duration: 0.28, ease: 'power2.out' });
        gsap.to(label, { scale: 1.06, color: "#000", duration: 0.22, ease: "power2.out" });
      }
    });
    li.addEventListener('blur', () => {
      li.style.background = 'none';
      li.style.boxShadow = 'none';
      li.style.transform = 'none';
      if (window.gsap) {
        gsap.to(icon, { scale: 1, rotate: 0, duration: 0.3, ease: 'power2.out' });
        gsap.to(label, { scale: 1, color: "#000", duration: 0.22, ease: "power2.out" });
      }
    });
  });
}

// --- Loop Slider Animation: FADE/SLIDE IN ONLY, NO MOVEMENT ---
function renderLoopSlider() {
  const slider = document.getElementById('loop-slider-inner');
  if (!slider) return;
  slider.innerHTML = '';
  featureSlides.forEach((slide, idx) => {
    const span = document.createElement('span');
    span.className = 'loop-slide modern-slide';
    span.textContent = `${slide.icon} ${slide.text}`;
    span.style.opacity = 0;
    // Always set color to black for these slides
    span.style.color = "#000";
    const theme = html.getAttribute('data-theme') || getPreferredTheme();
    if (theme === 'dark') {
      span.style.background = 'rgba(30,126,214,0.13)';
      span.style.borderRadius = '0.7em';
      span.style.padding = '0.5em 1.2em';
      span.style.boxShadow = '0 2px 8px 0 rgba(30,126,214,0.13)';
    } else {
      span.style.background = 'rgba(30,126,214,0.08)';
      span.style.borderRadius = '0.7em';
      span.style.padding = '0.5em 1.2em';
      span.style.boxShadow = '0 2px 8px 0 rgba(30,126,214,0.07)';
    }
    slider.appendChild(span);
  });

  if (window.gsap) {
    const allSlides = slider.querySelectorAll('.loop-slide');
    allSlides.forEach((slide, idx) => {
      gsap.fromTo(
        slide,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, delay: 0.1 + idx * 0.12, ease: 'power2.out' }
      );
    });
  }
  // Ensure color is black for the required slides
  updateLoopSliderFeatureColors();
}

function loadPage(page) {
  spaContent.classList.remove('spa-fade-in');
  spaContent.classList.add('spa-fade-out');
  showLogoLoader();
  setTimeout(() => {
    spaContent.innerHTML = pages[page] || pages.home;
    spaContent.scrollTop = 0;
    spaContent.classList.remove('spa-fade-out');
    spaContent.classList.add('spa-fade-in');
    hideLogoLoader();
    visitedPages[page] = true;
    localStorage.setItem('mm-visited-pages', JSON.stringify(visitedPages));
    updateProgressBar();
    if (Object.keys(visitedPages).length === Object.keys(pages).length) {
      showAchievement('🏆 Achievement: You explored all pages!');
    }
    animateHeroText();
    addFormInteractions();
    if (page === 'home') {
      renderModernPackages();
      addPricingCardAnimations();
      renderLoopSlider();
      animateHomeFeatures();
      setTimeout(() => {
        updatePackageCardThemes(html.getAttribute('data-theme') || getPreferredTheme());
        updateFeatureTheme(html.getAttribute('data-theme') || getPreferredTheme());
        updateLoopSliderFeatureColors();
      }, 0);
    }
    // On mobile, ensure all mobile elements are themed
    if (window.innerWidth < 700) {
      setTheme(html.getAttribute('data-theme') || getPreferredTheme(), false);
    }
    // After page load, always keep theme toggle centered under nav on mobile
    const nav = document.querySelector('.nav');
    const header = document.querySelector('.header');
    const themeToggle = document.querySelector('.theme-toggle');
    if (header && nav && themeToggle) {
      // Center the theme toggle under nav on mobile, else beside nav
      if (window.innerWidth <= 768) {
        // Create a wrapper if not present
        let wrapper = document.querySelector('.theme-toggle-mobile-center');
        if (!wrapper) {
          wrapper = document.createElement('div');
          wrapper.className = 'theme-toggle-mobile-center';
          wrapper.style.display = 'flex';
          wrapper.style.justifyContent = 'center';
          wrapper.style.marginTop = '1rem';
          wrapper.style.width = '100%';
        }
        if (themeToggle.parentElement !== wrapper) {
          wrapper.appendChild(themeToggle);
        }
        if (nav.nextSibling !== wrapper) {
          if (nav.nextSibling) {
            header.insertBefore(wrapper, nav.nextSibling);
          } else {
            header.appendChild(wrapper);
          }
        }
        themeToggle.classList.add('theme-toggle-centered-mobile');
      } else {
        // Remove wrapper and place themeToggle after nav in header
        let wrapper = document.querySelector('.theme-toggle-mobile-center');
        if (wrapper && wrapper.contains(themeToggle)) {
          wrapper.removeChild(themeToggle);
          if (nav.nextSibling) {
            header.insertBefore(themeToggle, nav.nextSibling);
          } else {
            header.appendChild(themeToggle);
          }
          wrapper.remove();
        } else if (themeToggle.parentElement !== header || themeToggle.previousElementSibling !== nav) {
          if (nav.nextSibling) {
            header.insertBefore(themeToggle, nav.nextSibling);
          } else {
            header.appendChild(themeToggle);
          }
        }
        themeToggle.classList.remove('theme-toggle-centered-mobile');
      }
    }
  }, 700);
}
window.addEventListener('DOMContentLoaded', () => {
  loadPage('home');
  updateProgressBar();
});
function animateHeroText() {
  const el = document.getElementById('animated-hero-title');
  if (!el) return;
  const text = el.textContent;
  el.textContent = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(type, 60);
    }
  }
  type();
}
function addFormInteractions() {
  const form = document.querySelector('.minimal-contact-form');
  if (!form) return;
  form.onsubmit = null;
  form.querySelectorAll('.form-group').forEach(g => g.classList.remove('invalid'));
  form.querySelectorAll('.error-message').forEach(e => e.remove());

  function showError(input, message) {
    const group = input.closest('.form-group');
    group.classList.add('invalid');
    let error = group.querySelector('.error-message');
    if (!error) {
      error = document.createElement('div');
      error.className = 'error-message';
      group.appendChild(error);
    }
    error.textContent = message;
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', error.id || (error.id = 'err-' + Math.random().toString(36).slice(2)));
  }
  function clearError(input) {
    const group = input.closest('.form-group');
    group.classList.remove('invalid');
    let error = group.querySelector('.error-message');
    if (error) error.remove();
    input.removeAttribute('aria-invalid');
    input.removeAttribute('aria-describedby');
  }
  function validateField(input) {
    if (!input.value.trim()) {
      showError(input, 'This field is required.');
      return false;
    }
    if (input.type === 'email' && !/^\S+@\S+\.\S+$/.test(input.value.trim())) {
      showError(input, 'Please enter a valid email address.');
      return false;
    }
    clearError(input);
    return true;
  }
  form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => validateField(input));
    input.addEventListener('blur', () => validateField(input));
  });
  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('input, textarea').forEach(input => {
      if (!validateField(input)) valid = false;
    });
    if (!valid) return;
    showAchievement('✅ Message sent!');
    form.reset();
    form.querySelectorAll('.form-group').forEach(g => g.classList.remove('invalid'));
    form.querySelectorAll('.error-message').forEach(e => e.remove());
  });
}
function renderSVGBackground() {
  const svg = `
    <svg width="100%" height="100%" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg" style="position:absolute;top:0;left:0;width:100vw;height:100vh;">
      <circle id="bg-c1" cx="400" cy="300" r="120" fill="#0056a6" fill-opacity="0.08"/>
      <circle id="bg-c2" cx="1600" cy="800" r="180" fill="#1e7ed6" fill-opacity="0.07"/>
      <rect id="bg-r1" x="1200" y="200" width="90" height="90" rx="24" fill="#1e7ed6" fill-opacity="0.06"/>
      <rect id="bg-r2" x="300" y="700" width="60" height="60" rx="18" fill="#0056a6" fill-opacity="0.07"/>
      <polygon id="bg-p1" points="900,200 950,300 850,300" fill="#1e7ed6" fill-opacity="0.06"/>
    </svg>
  `;
  document.getElementById('svg-bg').innerHTML = svg;
  gsap.to('#bg-c1', { y: 30, repeat: -1, yoyo: true, duration: 8, ease: 'sine.inOut' });
  gsap.to('#bg-c2', { x: -40, repeat: -1, yoyo: true, duration: 10, ease: 'sine.inOut' });
  gsap.to('#bg-r1', { rotation: 8, transformOrigin: 'center', repeat: -1, yoyo: true, duration: 9, ease: 'sine.inOut' });
  gsap.to('#bg-r2', { x: 20, repeat: -1, yoyo: true, duration: 7, ease: 'sine.inOut' });
  gsap.to('#bg-p1', { y: 18, repeat: -1, yoyo: true, duration: 11, ease: 'sine.inOut' });
}
renderSVGBackground();
const logo = document.querySelector('.logo');
if (logo) {
  logo.addEventListener('mouseenter', () => {
    gsap.to(logo, { rotate: 8, scale: 1.04, duration: 0.4, ease: 'power2.out' });
  });
  logo.addEventListener('mouseleave', () => {
    gsap.to(logo, { rotate: 0, scale: 1, duration: 0.5, ease: 'power2.out' });
  });
}
const fab = document.getElementById('fab-btn');
if (fab) {
  fab.addEventListener('click', () => {
    if (window.location.hash === '#contact') {
      document.querySelector('.minimal-contact-form input')?.focus();
    } else {
      gsap.to(window, { scrollTo: 0, duration: 1, ease: 'power2.out' });
    }
    gsap.fromTo(fab, { scale: 1 }, { scale: 1.08, yoyo: true, repeat: 1, duration: 0.2 });
  });
}

window.addEventListener('storage', (e) => {
  if (e.key === THEME_KEY) {
    setTheme(e.newValue, false);
    updateLoopSliderFeatureColors();
  }
});
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  setTheme(e.matches ? 'dark' : 'light', false);
  updateLoopSliderFeatureColors();
});
