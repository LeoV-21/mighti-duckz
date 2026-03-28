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

// --- Logo easter egg on click ---
const navLogoImg = document.querySelector('.nav-logo-img');
const flockLines = ['RUTHLESS.', 'FLY TOGETHER.', 'NO ONE LEFT BEHIND.', 'WE RUN THIS.', 'THE FLOCK IS HERE.'];
let flockCount = 0;

if (navLogoImg) {
  navLogoImg.style.cursor = 'pointer';
  navLogoImg.addEventListener('click', () => {
    const msg = flockLines[flockCount % flockLines.length];
    flockCount++;

    const toast = document.createElement('div');
    toast.textContent = msg;
    toast.style.cssText = `
      position: fixed;
      bottom: 32px;
      left: 50%;
      transform: translateX(-50%) translateY(0);
      background: #c1121f;
      color: white;
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.4rem;
      letter-spacing: 3px;
      padding: 12px 28px;
      border-radius: 50px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      z-index: 9999;
      pointer-events: none;
      animation: flock-in 0.3s ease forwards;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.4s, transform 0.4s';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(16px)';
      setTimeout(() => toast.remove(), 400);
    }, 1400);
  });
}

// --- Application form → mailto ---
const applyForm = document.getElementById('apply-form');
if (applyForm) {
  applyForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name     = document.getElementById('q-name').value.trim();
    const pace     = document.getElementById('q-pace').value.trim();
    const word     = document.getElementById('q-word').value.trim();
    const sign     = document.getElementById('q-sign').value.trim();
    const why      = document.getElementById('q-why').value.trim();
    const nani     = document.getElementById('q-nani').value.trim();
    const playlist = document.getElementById('q-playlist').value.trim();

    if (!name || !pace || !word || !sign || !why || !nani || !playlist) {
      alert('Please answer all questions. Meagan requires complete applications.');
      return;
    }

    const subject = encodeURIComponent(`Mighti Duckz Application — ${name}`);
    const body = encodeURIComponent(
`MIGHTI DUCKZ APPLICATION
========================

Name: ${name}

Q1: What's your pace... just wondering?
${pace}

Q2: If you had to use one word to describe yourself, what would it be?
${word}

Q3: What's your sign?
${sign}

Q4: Why do you want to join this group?
${why}

Q5: Have you sent Nani the $95? Be honest.
${nani}

Q6: On a scale of 1-10, how would you rate your playlist?
${playlist}

========================
⚠️ Reminder: $95 non-refundable application fee must be sent to Nani before the interview is scheduled.`
    );

    window.location.href = `mailto:Theruthlessflock@gmail.com?subject=${subject}&body=${body}`;
  });
}

// Inject keyframe for toast
const style = document.createElement('style');
style.textContent = `
  @keyframes flock-in {
    from { opacity: 0; transform: translateX(-50%) translateY(16px); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
`;
document.head.appendChild(style);
