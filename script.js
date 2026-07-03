const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

const setMenuState = (isOpen) => {
  siteNav.classList.toggle('active', isOpen);
  navToggle.classList.toggle('active', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
};

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = !siteNav.classList.contains('active');
    setMenuState(isOpen);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 760 && siteNav.classList.contains('active')) {
      setMenuState(false);
    }
  });
}

const links = document.querySelectorAll('.site-nav a');
links.forEach((link) => {
  link.addEventListener('click', () => {
    if (siteNav.classList.contains('active')) {
      setMenuState(false);
    }
  });
});

// Scroll reveal animations for cards
const revealElements = document.querySelectorAll('.section, .project-card, .hero-card, .hero-image, .work-card, .role-header');
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -30px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

revealElements.forEach((el) => {
  observer.observe(el);
});

// Parallax scroll effect for hero section
const heroSection = document.querySelector('.hero-section');
if (heroSection) {
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    heroSection.style.backgroundPosition = `0% ${scrollPos * 0.5}px`;
  });
}

// Smooth fade for nav on scroll
let lastScrollTop = 0;
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  if (scrollTop > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  lastScrollTop = scrollTop;
});
