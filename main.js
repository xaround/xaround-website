document.addEventListener('DOMContentLoaded', () => {
  // Section‑based background + header color
  const nav = document.querySelector('header');
  const sections = [...document.querySelectorAll('.section')];
  let sectionPositions = [];

  function calculateSectionPositions() {
    sectionPositions = sections.map(section => {
      const rect = section.getBoundingClientRect();
      return {
        el: section,
        top: rect.top + window.scrollY,
        bottom: rect.bottom + window.scrollY,
        bg: section.getAttribute('data-bg') || 'rgb(0, 0, 0)',
      };
    });
  }

  calculateSectionPositions();
  window.addEventListener('resize', () => {
    calculateSectionPositions();
    syncSidebarState();
  });

  if (sectionPositions.length) {
    document.body.style.background = sectionPositions[0].bg;
    nav.style.background = sectionPositions[0].bg;
  }

  let debounceTimer;
  window.addEventListener('scroll', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const scrollMid = window.pageYOffset + window.innerHeight / 2;
      const current = sectionPositions.find(
        s => scrollMid >= s.top && scrollMid <= s.bottom
      ) || sectionPositions[0];

      document.body.style.background = current.bg;
      nav.style.background = current.bg;
    }, 100);
  });

  // Mobile sidebar toggle + blur overlay
  const toggle  = document.getElementById('nav-toggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const main    = document.getElementById('main-content');

  let isMenuOpen = false;
  const MOBILE_BREAK = 768;

  function openMenu() {
    sidebar.classList.remove('-translate-x-full');
    sidebar.classList.add('translate-x-0');
    overlay.classList.remove('opacity-0', 'pointer-events-none');
    overlay.classList.add('opacity-100');
    main.classList.add('blur-sm');
  }

  function closeMenu() {
    sidebar.classList.remove('translate-x-0');
    sidebar.classList.add('-translate-x-full');
    overlay.classList.remove('opacity-100');
    overlay.classList.add('opacity-0', 'pointer-events-none');
    main.classList.remove('blur-sm');
  }

  function syncSidebarState() {
    const isMobile = window.innerWidth < MOBILE_BREAK;

    if (isMenuOpen && isMobile) {
      openMenu();
    } else {
      closeMenu();
    }
  }

  toggle.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    syncSidebarState();
  });

  overlay.addEventListener('click', () => {
    isMenuOpen = false;
    closeMenu();
  });
});