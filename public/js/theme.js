// ═══════════════════════════════════════════════════
// Theme Toggle — Cosmic Slate ↔ Cream Gallery
// Persists to localStorage, respects OS preference
// ═══════════════════════════════════════════════════

(function() {
  const STORAGE_KEY = 'asg-theme';

  function getPreferred() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    // Also toggle Tailwind's dark class for any dark: prefixed utilities
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_KEY, theme);
    updateButtons(theme);
  }

  function toggle() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    apply(current === 'dark' ? 'light' : 'dark');
  }

  function updateButtons(theme) {
    // Update sensory bar buttons
    document.querySelectorAll('[data-theme-btn]').forEach(btn => {
      const btnTheme = btn.getAttribute('data-theme-btn');
      if (btnTheme === theme) {
        btn.classList.add('bg-primary-container', 'text-on-primary-container');
        btn.classList.remove('border', 'border-outline-variant', 'text-on-surface-variant');
      } else {
        btn.classList.remove('bg-primary-container', 'text-on-primary-container');
        btn.classList.add('border', 'border-outline-variant', 'text-on-surface-variant');
      }
    });
    // Update sidebar toggle
    const sidebarBtn = document.getElementById('sidebar-theme-toggle');
    if (sidebarBtn) {
      const label = sidebarBtn.querySelector('.theme-label');
      if (label) label.textContent = theme === 'dark' ? 'Cream Gallery' : 'Cosmic Slate';
    }
  }

  // Apply immediately (before DOMContentLoaded to prevent flash)
  apply(getPreferred());

  // Bind buttons after DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    // Sensory bar buttons
    document.querySelectorAll('[data-theme-btn]').forEach(btn => {
      btn.addEventListener('click', function() {
        apply(this.getAttribute('data-theme-btn'));
      });
    });
    // Sidebar toggle
    const sidebarBtn = document.getElementById('sidebar-theme-toggle');
    if (sidebarBtn) sidebarBtn.addEventListener('click', toggle);
    // Update button states
    updateButtons(getPreferred());
  });

  // Expose for external use
  window.ThemeToggle = { toggle, apply, getPreferred };
})();
