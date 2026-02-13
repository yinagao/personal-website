
// ----- Footer year -----
document.getElementById('year').textContent = new Date().getFullYear();

// ----- Nav: add .scrolled class on scroll -----
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ----- Mobile nav toggle -----
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

toggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  // Animate the hamburger → X
  toggle.querySelectorAll('span').forEach((span, i) => {
    span.style.transform = open
      ? (i === 0 ? 'translateY(6.5px) rotate(45deg)' : 'translateY(-6.5px) rotate(-45deg)')
      : '';
  });
});

// Close mobile nav when a link is clicked
navLinks?.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    toggle.setAttribute('aria-expanded', false);
    toggle.querySelectorAll('span').forEach(span => (span.style.transform = ''));
  });
});

// ----- Active nav link on scroll -----
const sections = document.querySelectorAll('section[id]');
const linkMap   = {};
document.querySelectorAll('.nav-link').forEach(l => {
  const href = l.getAttribute('href');
  if (href?.startsWith('#')) linkMap[href.slice(1)] = l;
});

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      Object.values(linkMap).forEach(l => l.classList.remove('active'));
      linkMap[entry.target.id]?.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ----- Scroll-reveal (applies .reveal class to elements) -----
const revealTargets = [
  '.project-card',
  '.writing-item',
  '.about-grid',
  '.contact-inner',
];

// Add .reveal to every matching element
document.querySelectorAll(revealTargets.join(',')).forEach((el, i) => {
  el.classList.add('reveal');
  // Stagger within a parent grid
  if (el.classList.contains('project-card') || el.classList.contains('writing-item')) {
    const siblings = [...el.parentElement.children];
    const idx = siblings.indexOf(el);
    el.style.transitionDelay = `${idx * 70}ms`;
  }
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
