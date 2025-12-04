/* UI: Mobile menu, scroll reveals, simple parallax, form handler */

// Mobile menu (accessible)
const menuToggle = document.querySelector('.menu-toggle');
let mobileNav;
function createMobileNav() {
  mobileNav = document.createElement('nav');
  mobileNav.className = 'mobile-nav';
  mobileNav.setAttribute('aria-hidden', 'true');

  // clone primary nav links
  const primary = document.querySelector('.primary-nav');
  const clone = primary.cloneNode(true);
  clone.className = 'mobile-links';
  mobileNav.appendChild(clone);

  // close button
  const closeBtn = document.createElement('button');
  closeBtn.className = 'btn btn-outline';
  closeBtn.style.marginTop = '12px';
  closeBtn.textContent = 'Close';
  closeBtn.addEventListener('click', toggleMobileNav);
  mobileNav.appendChild(closeBtn);

  document.body.appendChild(mobileNav);

  // clicking a link closes nav
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    closeMobileNav();
  }));
}

function toggleMobileNav() {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  if (!mobileNav) createMobileNav();

  if (mobileNav.classList.contains('open')) {
    closeMobileNav();
  } else {
    openMobileNav();
  }
}
function openMobileNav() {
  mobileNav.classList.add('open');
  mobileNav.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeMobileNav() {
  if (!mobileNav) return;
  mobileNav.classList.remove('open');
  mobileNav.setAttribute('aria-hidden', 'true');
  menuToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

menuToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleMobileNav();
});

// close mobile nav if clicking outside
document.addEventListener('click', (e) => {
  if (!mobileNav) return;
  if (!mobileNav.contains(e.target) && !menuToggle.contains(e.target)) {
    closeMobileNav();
  }
});

// Simple parallax for hero bg on scroll (lightweight)
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
  if (!heroBg) return;
  const scrolled = window.scrollY;
  // move bg slower than scroll (subtle)
  heroBg.style.transform = `translateY(${scrolled * 0.15}px) scale(1.03)`;
});

// Reveal on scroll (IntersectionObserver)
const reveals = document.querySelectorAll('.reveal');
const revealOptions = {
  root: null,
  rootMargin: '0px 0px -8% 0px',
  threshold: 0.08
};
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target); // animate once
    }
  });
}, revealOptions);
reveals.forEach(r => revealObserver.observe(r));

// Smooth anchor scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile nav if open
        closeMobileNav();
      }
    }
  });
});

// Simple form handler (client-side only placeholder)
const orderForm = document.getElementById('order-form');
if (orderForm) {
  orderForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const status = document.getElementById('form-status');
    // visually validate required fields
    const name = orderForm.querySelector('#name');
    const email = orderForm.querySelector('#email');
    const details = orderForm.querySelector('#order-details');

    if (!name.value.trim() || !email.value.trim() || !details.value.trim()) {
      status.textContent = 'Please fill in required fields.';
      status.style.color = 'crimson';
      return;
    }

    // simulate submit (replace with real AJAX or form endpoint)
    status.style.color = 'var(--deep)';
    status.textContent = 'Sending order…';

    setTimeout(() => {
      status.textContent = 'Thanks! Your order request was received. We will email you to confirm pickup details.';
      orderForm.reset();
    }, 900);
  });
}

// small niceties
document.getElementById('current-year').textContent = new Date().getFullYear();
