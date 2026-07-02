// ═══════════════════════════════════════════════════
// Mobile Menu — Hamburger toggle + slide-out overlay
// Shared across all pages
// ═══════════════════════════════════════════════════
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        const overlay = document.getElementById('mobile-menu-overlay');
        if (!btn || !menu) return;

        function open() {
            menu.classList.remove('translate-x-full');
            menu.classList.add('translate-x-0');
            if (overlay) { overlay.classList.remove('opacity-0', 'pointer-events-none'); overlay.classList.add('opacity-100'); }
            btn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }

        function close() {
            menu.classList.remove('translate-x-0');
            menu.classList.add('translate-x-full');
            if (overlay) { overlay.classList.remove('opacity-100'); overlay.classList.add('opacity-0', 'pointer-events-none'); }
            btn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }

        btn.addEventListener('click', function() {
            menu.classList.contains('translate-x-full') ? open() : close();
        });
        if (overlay) overlay.addEventListener('click', close);

        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') close();
        });
    });
})();
