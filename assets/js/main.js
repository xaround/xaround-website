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

  // Dropdown functionality for mobile menu
  const mobileDropdownTriggers = document.querySelectorAll('.mobile-dropdown-trigger');
  mobileDropdownTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const menu = trigger.nextElementSibling;
      const arrow = trigger.querySelector('.mobile-dropdown-arrow');
      
      if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        arrow.classList.add('rotate');
      } else {
        menu.classList.add('hidden');
        arrow.classList.remove('rotate');
      }
    });
  });

  // Dropdown functionality for sidebar
  const sidebarDropdownTriggers = document.querySelectorAll('.sidebar-dropdown-trigger');
  sidebarDropdownTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const menu = trigger.nextElementSibling;
      const arrow = trigger.querySelector('.sidebar-dropdown-arrow');
      
      if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        arrow.classList.add('rotate');
      } else {
        menu.classList.add('hidden');
        arrow.classList.remove('rotate');
      }
    });
  });

  // FAQ Accordion functionality
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach((question) => {
    question.addEventListener('click', (e) => {
      e.preventDefault();
      
      const faqItem = question.closest('.faq-item');
      const answer = faqItem.querySelector('.faq-answer');
      const icon = question.querySelector('.faq-icon');
      
      if (answer.classList.contains('hidden')) {
        // Open this FAQ
        answer.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
        
        // Add a subtle animation for the answer content
        answer.style.opacity = '0';
        answer.style.maxHeight = '0px';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'opacity 0.3s ease, max-height 0.3s ease';
        
        // Trigger animation
        setTimeout(() => {
          answer.style.opacity = '1';
          answer.style.maxHeight = '500px'; // Adjust if needed for longer content
        }, 10);
        
      } else {
        // Close this FAQ
        answer.style.opacity = '0';
        answer.style.maxHeight = '0px';
        icon.style.transform = 'rotate(0deg)';
        
        setTimeout(() => {
          answer.classList.add('hidden');
          answer.style.opacity = '';
          answer.style.maxHeight = '';
          answer.style.overflow = '';
          answer.style.transition = '';
        }, 300);
      }
    });
  });

  // Desktop Navigation Active State Management
  const navItems = document.querySelectorAll('#nav-menu a, #nav-menu button.dropdown-trigger');
  const currentPath = window.location.pathname;
  
  // Define page-to-nav mapping
  const pageNavMap = {
    'index.html': 'home',
    '/index.html': 'home',
    '/': 'home',
    '': 'home',
    'about.html': 'about',
    'privacy-policy.html': 'legal',
    'user-agreement.html': 'legal',
    'community-guidelines.html': 'resources',
    'faqs.html': 'resources',
    'questions-and-answers.html': 'resources'
  };
  
  // Get current page key - handle both root and pages directory
  let currentPageKey = currentPath.split('/').pop() || 'index.html';
  if (currentPath === '/' || currentPath.endsWith('/')) {
    currentPageKey = 'index.html';
  }
  
  const activeNavSection = pageNavMap[currentPageKey] || 'home';
  
  // Set initial active states
  function setActiveNavState() {
    // Reset all nav items in #nav-menu only
    const navMenuItems = document.querySelectorAll('#nav-menu a, #nav-menu button.dropdown-trigger');
    navMenuItems.forEach(item => {
      item.classList.remove('text-white', 'bg-[rgb(28,28,28)]');
      item.classList.add('text-[rgb(160,160,160)]');
    });
    
    // Find and activate current nav item
    if (activeNavSection === 'home') {
      const homeLink = document.querySelector('#nav-menu a[href="../index.html"], #nav-menu a[href="index.html"], #nav-menu a[href="/"]');
      if (homeLink) {
        homeLink.classList.remove('text-[rgb(160,160,160)]');
        homeLink.classList.add('text-white', 'bg-[rgb(28,28,28)]');
      }
    } else if (activeNavSection === 'about') {
      const aboutLink = document.querySelector('#nav-menu a[href="about.html"], #nav-menu a[href="pages/about.html"]');
      if (aboutLink) {
        aboutLink.classList.remove('text-[rgb(160,160,160)]');
        aboutLink.classList.add('text-white', 'bg-[rgb(28,28,28)]');
      }
    } else if (activeNavSection === 'legal') {
      const legalButton = Array.from(document.querySelectorAll('#nav-menu button.dropdown-trigger')).find(btn => btn.textContent.includes('Legal'));
      if (legalButton) {
        legalButton.classList.remove('text-[rgb(160,160,160)]');
        legalButton.classList.add('text-white', 'bg-[rgb(28,28,28)]');
      }
    } else if (activeNavSection === 'resources') {
      const resourcesButton = Array.from(document.querySelectorAll('#nav-menu button.dropdown-trigger')).find(btn => btn.textContent.includes('Resources'));
      if (resourcesButton) {
        resourcesButton.classList.remove('text-[rgb(160,160,160)]');
        resourcesButton.classList.add('text-white', 'bg-[rgb(28,28,28)]');
      }
    }
  }
  
  // Add hover state management only to nav menu items
  const navMenuItems = document.querySelectorAll('#nav-menu a, #nav-menu button.dropdown-trigger');
  navMenuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      // Remove active state from all nav menu items
      navMenuItems.forEach(navItem => {
        navItem.classList.remove('text-white', 'bg-[rgb(28,28,28)]');
        navItem.classList.add('text-[rgb(160,160,160)]');
      });
      
      // Add hover state to current item
      item.classList.remove('text-[rgb(160,160,160)]');
      item.classList.add('text-white', 'bg-[rgb(28,28,28)]');
    });
    
    item.addEventListener('mouseleave', () => {
      // Restore original active state
      setActiveNavState();
    });
  });
  
  // Set initial active state
  setActiveNavState();

  // Simple page load fade-in - handled entirely by CSS
  // No JavaScript needed for the fade-in animation

  // Add smooth scrolling for premium feel
  document.documentElement.style.scrollBehavior = 'smooth';
  
  // Optional: Add a subtle loading animation
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });
});