// Minimal JS: hamburger menu + small enhancements

let burger = document.querySelector('.burger');
let nav = document.querySelector('.nav');
let navPanel = document.querySelector('[data-nav-panel]');
let navLinks = document.querySelectorAll('.nav-link');

let form = document.querySelector('#contact-form');
let formNote = document.querySelector('.form-note');

function setMenuOpen(isOpen) {
  if (!burger || !nav || !navPanel) return;

  burger.setAttribute('aria-expanded', String(isOpen));
  burger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  nav.classList.toggle('is-open', isOpen);
  let isMobile = window.matchMedia('(max-width: 899px)').matches;
  document.body.classList.toggle('nav-open', isOpen && isMobile);

  if (isOpen) {
    // Focus first link for keyboard users
    let firstLink = navPanel.querySelector('a');
    if (firstLink) firstLink.focus();
  }
}

function isMenuOpen() {
  return !!nav && nav.classList.contains('is-open');
}

if (burger) {
  burger.addEventListener('click', function () {
    setMenuOpen(!isMenuOpen());
  });
}

// Close on link click (mobile)
navLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    if (window.matchMedia('(max-width: 899px)').matches) {
      setMenuOpen(false);
    }
  });
});

// Close on Escape
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && isMenuOpen()) {
    setMenuOpen(false);
    if (burger) burger.focus();
  }
});

// Click outside to close (simple)
document.addEventListener('click', function (event) {
  if (!isMenuOpen()) return;
  if (!nav || !burger) return;

  let target = event.target;
  if (target instanceof Node) {
    let clickedInsideNav = nav.contains(target);
    let clickedBurger = burger.contains(target);
    if (!clickedInsideNav && !clickedBurger) {
      setMenuOpen(false);
    }
  }
});

// Reset menu state when leaving mobile
window.addEventListener('resize', function () {
  if (window.matchMedia('(min-width: 900px)').matches) {
    // Ensure we don't keep body scroll locked after resizing.
    document.body.classList.remove('nav-open');
  }
});

// Minimal form confirmation (front-end only)
if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    let name = form.querySelector('input[name="name"]');
    let email = form.querySelector('input[name="email"]');
    let message = form.querySelector('textarea[name="message"]');

    if (!name || !email || !message) return;

    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
      form.reportValidity();
      return;
    }

    if (formNote) {
      formNote.hidden = false;
      formNote.textContent = 'Thanks, ' + name.value.trim() + ' — message prepared. (No backend connected.)';
    }

    form.reset();
  });
}
