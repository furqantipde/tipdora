import './style.css';
import { initLayout } from './components/layout.js';

// Initialize Global Layout (Header, Footer)
initLayout();

// Dark Mode & Global Logic
document.addEventListener('DOMContentLoaded', () => {

  // --- Dark Mode Logic ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const darkIcon = document.getElementById('theme-toggle-dark-icon');
  const lightIcon = document.getElementById('theme-toggle-light-icon');

  // Check Preference
  if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    lightIcon?.classList.remove('hidden');
  } else {
    document.documentElement.classList.remove('dark');
    darkIcon?.classList.remove('hidden');
  }

  // Toggle Handler
  themeToggleBtn?.addEventListener('click', function () {
    // Toggle icons
    darkIcon.classList.toggle('hidden');
    lightIcon.classList.toggle('hidden');

    // Toggle state
    if (localStorage.getItem('color-theme')) {
      if (localStorage.getItem('color-theme') === 'light') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
      }
    } else {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
      }
    }
  });

  // --- Search Logic (Simple Redirect) ---
  const searchInput = document.getElementById('navbar-search');
  searchInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const query = searchInput.value.toLowerCase();
      // Simple mapping or redirect logic could go here.
      // For now, redirect to calculators index (a real search would filter the grid)
      window.location.href = '/calculators/index.html';
    }
  });

  // --- Global Animations (Fade In) ---
  // Simple intersection observer for fade-in elements
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        entry.target.classList.remove('opacity-0', 'translate-y-4');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    el.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-4');
    observer.observe(el);
  });
});
