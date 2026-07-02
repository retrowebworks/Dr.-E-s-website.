// RetroWebWorks Deploy Kit — Client Configuration
// THE ONLY FILE THAT CHANGES PER CLIENT DEPLOYMENT
// Swap these values, deploy, done.

const CLIENT = {
  // ─── Identity ──────────────────────────────────────
  siteName: "BIO-REVERSAL",
  tagline: "Restoring Balance. Navigating Biological Data with Dignity.",
  ownerName: "Dr. E",
  ownerCredentials: "MD, Board Certified",
  contactEmail: "contact@bioreversal.com",
  copyrightEntity: "Biological Reversal ASD Ecosystem",
  copyrightYear: 2026,

  // ─── Tier: "standard" or "hipaa" ───────────────────
  tier: "hipaa",

  // ─── Firebase (populated after project creation) ───
  firebase: {
    apiKey: "",
    authDomain: "",
    projectId: "bio-reversal-dev",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  },

  // ─── Design Tokens ─────────────────────────────────
  theme: {
    // Cosmic Slate (Dark — default)
    dark: {
      bgPrimary: "#030303",
      bgCard: "#0d0d0d",
      bgInput: "#1a1a1a",
      borderColor: "#2a2a2a",
      textPrimary: "#ffffff",
      textMuted: "#a0a0a0",
      accentCopper: "#9a5d3e",
      accentGold: "#7d6227",
      accentPurple: "#584472",
    },
    // Cream Gallery (Light)
    light: {
      bgPrimary: "#f5f0e8",
      bgCard: "#ffffff",
      bgInput: "#ede8df",
      borderColor: "#d4cfc6",
      textPrimary: "#1a1a1a",
      textMuted: "#6b6b6b",
      accentCopper: "#9a5d3e",
      accentGold: "#7d6227",
      accentPurple: "#584472",
    },
    fontFamily: "'Abcdiatype', 'Inter', -apple-system, sans-serif",
    fontFamilyMono: "'JetBrains Mono', 'Fira Code', monospace",
    borderRadius: "12px",
    borderRadiusSmall: "8px",
  },

  // ─── Feature Flags ─────────────────────────────────
  features: {
    sensorySettings: true,
    researchLibrary: true,
    clinicianPortal: true,      // HIPAA tier
    patientLogin: true,         // HIPAA tier
    auditLogging: true,         // HIPAA tier
    artismMarketplace: false,   // Future add-on
    aiAssistant: false,         // Future add-on
    bookSales: false,           // Future add-on
    emailCapture: true,
    supportTickets: true,
  },

  // ─── Navigation ────────────────────────────────────
  nav: [
    { label: "Research", href: "/research.html", public: true },
    { label: "Portals", href: "/portal.html", public: false, minRole: "patient" },
    { label: "About", href: "/about.html", public: true },
    { label: "Support", href: "/support.html", public: true },
  ],

  // ─── Legal ─────────────────────────────────────────
  disclaimer: "This website provides educational information based on clinical research and observations. It is not a substitute for professional medical advice, diagnosis, or treatment.",

  footerLinks: [
    { label: "Privacy Policy", href: "/privacy.html" },
    { label: "Accessibility Statement", href: "/accessibility.html" },
    { label: "Clinical Ethics", href: "/ethics.html" },
    { label: "Contact Support", href: "/support.html" },
  ],
};

// ponytail: config is a plain object, not a class. No getter/setter overhead.
// Upgrade path: if multi-tenant needed, fetch config from Firestore /config/site instead.

// Export for both browser (global) and Node.js (require)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CLIENT;
} else {
  window.CLIENT = CLIENT;
}
