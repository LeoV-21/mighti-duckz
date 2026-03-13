// ============================================
//  Mighti Duckz — Scripts
// ============================================

// --- Sticky navbar shadow on scroll ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

// --- Mobile hamburger menu ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close nav on link click (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// --- Scroll fade-in animations ---
const fadeElements = document.querySelectorAll(
  '.about-card, .member-card, .rules-list li, .about-story'
);

fadeElements.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

fadeElements.forEach(el => observer.observe(el));

// --- Stagger member cards ---
document.querySelectorAll('.member-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.07}s`;
});

// --- Quack easter egg on logo click ---
const logoText = document.querySelector('.logo-text');
const quacks = ['QUACK!', 'QUAAACK!', 'quack quack!', '*aggressively quacks*', 'Q U A C K'];
let quackCount = 0;

logoText.style.cursor = 'pointer';
logoText.addEventListener('click', () => {
  const msg = quacks[quackCount % quacks.length];
  quackCount++;

  const toast = document.createElement('div');
  toast.textContent = msg;
  toast.style.cssText = `
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%) translateY(0);
    background: #e9c46a;
    color: #264653;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.4rem;
    letter-spacing: 3px;
    padding: 12px 28px;
    border-radius: 50px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    z-index: 9999;
    pointer-events: none;
    animation: quack-in 0.3s ease forwards;
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s, transform 0.4s';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(16px)';
    setTimeout(() => toast.remove(), 400);
  }, 1400);
});

// Inject keyframe for toast
const style = document.createElement('style');
style.textContent = `
  @keyframes quack-in {
    from { opacity: 0; transform: translateX(-50%) translateY(16px); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
`;
document.head.appendChild(style);
