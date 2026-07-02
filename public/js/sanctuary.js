// ═══════════════════════════════════════════════════
// Sensory Sanctuary Settings Engine
// Theme toggle, Calm Mode, Reduce Motion
// Persists to localStorage (unauthenticated) or
// Firestore user profile (authenticated)
// ═══════════════════════════════════════════════════

const Sanctuary = (() => {
  const STORAGE_KEY = 'sanctuary-settings';

  const defaults = {
    theme: 'dark',    // 'dark' | 'light'
    calm: false,
    reduceMotion: false,
  };

  // ─── State ───
  let settings = { ...defaults };

  // ─── Init ───
  function init() {
    // Load saved settings or detect OS preferences
    const saved = loadFromStorage();
    if (saved) {
      settings = { ...defaults, ...saved };
    } else {
      // Respect OS-level preferences as defaults
      if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        settings.theme = 'light';
      }
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        settings.reduceMotion = true;
      }
    }

    applyAll();
    renderPanel();
  }

  // ─── Apply settings to DOM ───
  function applyAll() {
    const root = document.documentElement;
    root.setAttribute('data-theme', settings.theme);
    root.setAttribute('data-calm', settings.calm);
    root.setAttribute('data-motion', settings.reduceMotion ? 'reduced' : 'full');
  }

  // ─── Toggle functions ───
  function toggleTheme() {
    settings.theme = settings.theme === 'dark' ? 'light' : 'dark';
    applyAll();
    save();
    updatePanel();
  }

  function toggleCalm() {
    settings.calm = !settings.calm;
    applyAll();
    save();
    updatePanel();
  }

  function toggleMotion() {
    settings.reduceMotion = !settings.reduceMotion;
    applyAll();
    save();
    updatePanel();
  }

  // ─── Persistence ───
  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    // ponytail: if user is authenticated, also save to Firestore /users/{uid}.preferences
    // Upgrade path: import auth.js, check currentUser, update Firestore doc
  }

  function loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  // ─── Render the floating panel ───
  function renderPanel() {
    // Don't double-render
    if (document.getElementById('sanctuary-panel')) return;

    const panel = document.createElement('aside');
    panel.id = 'sanctuary-panel';
    panel.className = 'sanctuary-panel';
    panel.setAttribute('aria-label', 'Sensory Sanctuary Settings');

    panel.innerHTML = `
      <span class="sanctuary-panel__title">Utility Controls</span>
      <span class="sanctuary-panel__subtitle">Sensory Sanctuary Settings</span>
      <button class="sanctuary-toggle" id="sanctuary-theme"
              aria-pressed="${settings.theme === 'light'}"
              title="Toggle between Cosmic Slate and Cream Gallery themes">
        <span class="sanctuary-toggle__icon">🌗</span>
        <span>${settings.theme === 'dark' ? 'Cream Gallery' : 'Cosmic Slate'}</span>
      </button>
      <button class="sanctuary-toggle" id="sanctuary-calm"
              aria-pressed="${settings.calm}"
              title="Activate Calm Mode for reduced visual intensity">
        <span class="sanctuary-toggle__icon">🫧</span>
        <span>Calm Mode</span>
      </button>
      <button class="sanctuary-toggle" id="sanctuary-motion"
              aria-pressed="${settings.reduceMotion}"
              title="Reduce Motion to disable animations and transitions">
        <span class="sanctuary-toggle__icon">✧</span>
        <span>Reduce Motion</span>
      </button>
    `;

    document.body.appendChild(panel);

    // Event listeners
    document.getElementById('sanctuary-theme').addEventListener('click', toggleTheme);
    document.getElementById('sanctuary-calm').addEventListener('click', toggleCalm);
    document.getElementById('sanctuary-motion').addEventListener('click', toggleMotion);
  }

  function updatePanel() {
    const themeBtn = document.getElementById('sanctuary-theme');
    const calmBtn = document.getElementById('sanctuary-calm');
    const motionBtn = document.getElementById('sanctuary-motion');

    if (themeBtn) {
      themeBtn.setAttribute('aria-pressed', settings.theme === 'light');
      themeBtn.querySelector('span:last-child').textContent =
        settings.theme === 'dark' ? 'Cream Gallery' : 'Cosmic Slate';
    }
    if (calmBtn) {
      calmBtn.setAttribute('aria-pressed', settings.calm);
    }
    if (motionBtn) {
      motionBtn.setAttribute('aria-pressed', settings.reduceMotion);
    }
  }

  // ─── Public API ───
  return {
    init,
    toggleTheme,
    toggleCalm,
    toggleMotion,
    getSettings: () => ({ ...settings }),
  };
})();

// Auto-init when DOM is ready
document.addEventListener('DOMContentLoaded', Sanctuary.init);
