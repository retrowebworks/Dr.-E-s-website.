# Autism's Saving Grace — Agent Operations Handbook

> **Any AI agent working in this project MUST read this file first.**
> This is the single source of truth for architecture, credentials, deployment, and rules.

---

## 1. Project Identity

| Field | Value |
|---|---|
| **Project Name** | Autism's Saving Grace (formerly "BIO-REVERSAL") |
| **Owner** | Dr. E (via RetroWebWorks) |
| **Business Entity** | RetroWebWorks (`greg@retrowebworks.com`) |
| **Purpose** | Clinical research & education platform for Autism Spectrum Disorder biological reversal |
| **Live URL** | https://bio-reversal-dev.web.app |
| **GitHub Repo** | https://github.com/retrowebworks/Dr.-E-s-website..git |
| **Branch** | `master` (only branch) |
| **Local Path** | `C:\Users\Dad's PC\Desktop\Bio-Reversal` |

---

## 2. Firebase Configuration (PRODUCTION)

> ⚠️ **CRITICAL**: This project runs on Firebase under the `greg@retrowebworks.com` Google account.

### Project Details

| Field | Value |
|---|---|
| **Firebase Project ID** | `bio-reversal-dev` |
| **Firebase Console** | https://console.firebase.google.com/project/bio-reversal-dev/overview |
| **Plan** | Spark (free tier) — Blaze required for Cloud Functions |
| **Region** | us-central1 |

### Firebase SDK Credentials (Client-Side — Safe to Expose)

```javascript
{
  apiKey: "AIzaSyD0cgfs4t60wzwH-yrg01uA9VmFmVLAh2E",
  authDomain: "bio-reversal-dev.firebaseapp.com",
  projectId: "bio-reversal-dev",
  storageBucket: "bio-reversal-dev.firebasestorage.app",
  messagingSenderId: "90469299022",
  appId: "1:90469299022:web:5326f57a7da98b96ede41f",
  measurementId: "G-C92HJ61PYL"
}
```

### Enabled Services

| Service | Status | Notes |
|---|---|---|
| **Hosting** | ✅ Active | Static HTML deployed to CDN |
| **Firestore** | ✅ Active | Database with security rules |
| **Authentication** | ✅ Enabled | Email/Password provider ready |
| **Cloud Functions** | ❌ Requires Blaze | `functions/` folder exists but can't deploy on Spark |
| **Storage** | ❌ Not configured | Not needed yet |

### Deployment Commands

```bash
# Deploy ONLY the website (most common)
npx firebase-tools deploy --only "hosting" --project bio-reversal-dev

# Deploy Firestore security rules
npx firebase-tools deploy --only "firestore:rules" --project bio-reversal-dev

# Deploy everything (requires Blaze for functions)
npx firebase-tools deploy --project bio-reversal-dev

# Check login status
npx firebase-tools login:list

# Login if needed
npx firebase-tools login
```

### Authentication State

Firebase CLI is authenticated locally via `greg@retrowebworks.com`. If auth expires:
1. Run `npx firebase-tools login`
2. A browser window opens — sign in with `greg@retrowebworks.com`
3. The OAuth redirect goes to `localhost:9005`

---

## 3. Project Architecture

### Directory Structure

```
Bio-Reversal/
├── .agents/                    # THIS FOLDER — Agent instructions
│   └── AGENTS.md               # This file
├── .firebase/                  # Firebase cache (gitignored)
├── .firebaserc                 # Firebase project binding
├── config/
│   └── client.js               # Master client configuration
├── firebase.json               # Firebase service config
├── firestore/
│   ├── firestore.rules         # Firestore security rules
│   └── seed.js                 # Database seeding script
├── functions/
│   ├── index.js                # Cloud Functions (requires Blaze)
│   └── package.json            # Functions dependencies
├── public/                     # ← DEPLOYED TO FIREBASE HOSTING
│   ├── index.html              # Hero landing page (animated logo)
│   ├── research.html           # Research Library (timeline modules)
│   ├── portal.html             # Clinician Portal (patient data)
│   ├── about.html              # Mission & Core Directives
│   ├── support.html            # Support & Onboarding wizard
│   ├── assets/
│   │   └── logo.png            # Brand logo (stylized "A")
│   ├── css/
│   │   └── theme.css           # Theme system (dark/light variables)
│   └── js/
│       ├── theme.js            # Theme toggle engine
│       └── mobile-menu.js      # Hamburger menu logic
├── ARCHITECTURE_BLUEPRINT.md   # Technical architecture doc
├── CONTENT_GUARDRAILS.md       # Content policy & tone rules
├── DESIGN_SYSTEM.md            # Design tokens reference
└── PROJECT_BRIEF.md            # Original project brief
```

### Technology Stack

| Layer | Technology | Notes |
|---|---|---|
| **Hosting** | Firebase Hosting | Static files on Google CDN |
| **CSS Framework** | Tailwind CSS (CDN) | Loaded via `<script src="https://cdn.tailwindcss.com">` |
| **Typography** | Manrope (Google Fonts) | All weights 400-700 |
| **Icons** | Material Symbols Outlined | Google's icon font |
| **Theme System** | CSS Custom Properties | Defined in `/css/theme.css`, consumed by Tailwind config |
| **JavaScript** | Vanilla JS only | No frameworks, no build step |
| **Backend** | Firebase (Firestore + Auth) | Not yet wired to frontend |
| **Version Control** | Git → GitHub | Single `master` branch |

---

## 4. Design System

### Brand Name

**"Autism's Saving Grace"** — Use this everywhere. Never use "BIO-REVERSAL" (old name, fully deprecated).

### Color System (MD3 Tonal Palette)

All colors are defined as CSS custom properties in `/public/css/theme.css`. The Tailwind config on each page maps these variables to utility class names.

**DO NOT hardcode hex values in HTML.** Always use Tailwind utility classes that reference CSS variables.

#### Dark Mode: "Cosmic Slate"

| Token | Variable | Hex |
|---|---|---|
| Background | `--color-background` | `#141313` |
| Surface | `--color-surface` | `#141313` |
| On-Surface | `--color-on-surface` | `#e5e2e1` |
| Primary | `--color-primary` | `#ffb692` (terracotta) |
| Primary Container | `--color-primary-container` | `#9a5d3e` |
| Secondary | `--color-secondary` | `#e5c27d` (antique gold) |
| Tertiary | `--color-tertiary` | `#d5bcf2` (lavender) |
| Outline Variant | `--color-outline-variant` | `#52443d` |

#### Light Mode: "Cream Gallery"

| Token | Variable | Hex |
|---|---|---|
| Background | `--color-background` | `#fdf8f6` |
| Surface | `--color-surface` | `#fdf8f6` |
| On-Surface | `--color-on-surface` | `#1c1b1b` |
| Primary | `--color-primary` | `#8a4f32` |
| Primary Container | `--color-primary-container` | `#ffdbcb` |
| Secondary | `--color-secondary` | `#755a20` |
| Tertiary | `--color-tertiary` | `#6a5584` |
| Outline Variant | `--color-outline-variant` | `#d7c2b9` |

### Typography

- **Font Family**: `Manrope` (Google Fonts)
- **Headline Large**: 40px / 600 weight / -0.02em tracking
- **Headline Medium**: 24px / 500 weight
- **Body Large**: 18px / 400 weight
- **Body Medium**: 16px / 400 weight
- **Label Medium**: 14px / 600 weight / 0.05em tracking / UPPERCASE in sensory bar
- **Caption**: 12px / 400 weight

### Logo

- **File**: `/public/assets/logo.png`
- **Description**: Stylized "A" with terracotta/copper fills and flowing organic lines
- **Usage in navbar**: `<img src="/assets/logo.png" alt="" class="h-8 w-auto" />`
- **Hero page**: Animated with CSS entrance, 3D rotation, mouse/touch tracking

---

## 5. Theme System (How It Works)

### Architecture

1. **`/public/css/theme.css`** — Defines ALL color values as CSS custom properties under `:root` (dark default) and `[data-theme="light"]`
2. **Tailwind config** (inline on each page) — Maps color names to `var(--color-name)` references
3. **`/public/js/theme.js`** — Toggle engine: switches `data-theme` attribute, persists to `localStorage`, updates button states
4. **Theme toggles** — Sensory bar buttons (homepage) and sidebar buttons (all other pages)

### Adding a New Page

When creating a new HTML page, you MUST:

1. Copy the `<script id="tailwind-config">` block from any existing page — it uses CSS variable references, NOT hex values
2. Include `<link rel="stylesheet" href="/css/theme.css"/>` in `<head>`
3. Include `<script src="/js/theme.js"></script>` in `<head>`
4. Include `<script src="/js/mobile-menu.js"></script>` in `<head>`
5. Add the mobile menu HTML (overlay + slide-out nav) after `<body>`
6. Add `id="mobile-menu-btn"` hamburger button in the header
7. Add `id="sidebar-theme-toggle"` button in the sidebar (if page has one)
8. Set `<html class="dark">` as default
9. Use `bg-background text-on-background` on `<body>`

### Tailwind Config Template (Copy This)

```javascript
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
        "background": "var(--color-background)",
        "surface": "var(--color-surface)",
        "surface-dim": "var(--color-surface-dim)",
        "surface-container": "var(--color-surface-container)",
        "surface-container-low": "var(--color-surface-container-low)",
        "surface-container-high": "var(--color-surface-container-high)",
        "surface-container-lowest": "var(--color-surface-container-lowest)",
        "surface-container-highest": "var(--color-surface-container-highest)",
        "surface-variant": "var(--color-surface-variant)",
        "surface-bright": "var(--color-surface-bright)",
        "on-surface": "var(--color-on-surface)",
        "on-surface-variant": "var(--color-on-surface-variant)",
        "on-background": "var(--color-on-background)",
        "primary": "var(--color-primary)",
        "primary-container": "var(--color-primary-container)",
        "primary-fixed": "var(--color-primary-fixed)",
        "primary-fixed-dim": "var(--color-primary-fixed-dim)",
        "on-primary": "var(--color-on-primary)",
        "on-primary-container": "var(--color-on-primary-container)",
        "secondary": "var(--color-secondary)",
        "secondary-container": "var(--color-secondary-container)",
        "secondary-fixed": "var(--color-secondary-fixed)",
        "on-secondary": "var(--color-on-secondary)",
        "on-secondary-container": "var(--color-on-secondary-container)",
        "tertiary": "var(--color-tertiary)",
        "tertiary-container": "var(--color-tertiary-container)",
        "tertiary-fixed": "var(--color-tertiary-fixed)",
        "on-tertiary": "var(--color-on-tertiary)",
        "on-tertiary-container": "var(--color-on-tertiary-container)",
        "outline": "var(--color-outline)",
        "outline-variant": "var(--color-outline-variant)",
        "error": "var(--color-error)",
        "error-container": "var(--color-error-container)",
        "on-error": "var(--color-on-error)",
        "on-error-container": "var(--color-on-error-container)",
        "inverse-surface": "var(--color-inverse-surface)",
        "inverse-on-surface": "var(--color-inverse-on-surface)",
        "inverse-primary": "var(--color-inverse-primary)"
      }
      // ... also include borderRadius, spacing, fontFamily, fontSize
      // (copy from any existing page)
    }
  }
}
```

---

## 6. What Has Been Built (as of 2026-07-03)

### Pages (All Live at bio-reversal-dev.web.app)

| Page | File | Status | Features |
|---|---|---|---|
| **Hero Landing** | `index.html` | ✅ Live | Animated 3D logo (entrance, float, glow, rotate, mouse tracking), navigation cards, medical disclaimer |
| **Research Library** | `research.html` | ✅ Live | Timeline layout, research modules (Phase 1-3), brain illustration, search |
| **Clinician Portals** | `portal.html` | ✅ Live | Patient assessment form, metabolic trend bars, chart visualization, training materials, chat widget |
| **About** | `about.html` | ✅ Live | Mission statement, Core Directives, Sensory Sanctuary philosophy |
| **Support & Onboarding** | `support.html` | ✅ Live | Step-by-step onboarding wizard, ticket submission, ticket history |

### Shared Systems

| System | Files | Status |
|---|---|---|
| **Theme Toggle** | `css/theme.css`, `js/theme.js` | ✅ All pages |
| **Mobile Menu** | `js/mobile-menu.js` | ✅ All pages |
| **Logo** | `assets/logo.png` | ✅ All navbars |
| **Responsive** | Tailwind breakpoints | ✅ Mobile/tablet/desktop |

### Logo Animation Stack (index.html only)

| Animation | Timing | Description |
|---|---|---|
| Entrance | 0–1.8s | Scale up from 0.7 + blur fade-in |
| Float | 6s loop (after 2s) | Gentle Y-axis bob |
| Glow | 4s loop (after 2.5s) | Subtle terracotta drop-shadow pulse |
| 3D Spin | 20s loop (after 3s) | Y-axis rotation with X-axis wobble |
| 3D Depth | — | 24 extrusion layers × 4px = 96px total thickness |
| Mouse Tracking | On hover | ±30° tilt following cursor, dynamic shadow |
| Touch Tracking | On touch | Same as mouse, for mobile/tablet |
| prefers-reduced-motion | — | All animations disabled for accessibility |

---

## 7. What Needs To Be Built (Roadmap)

### Phase 2: Authentication & User Flow

- [ ] `public/js/auth.js` — Firebase Auth integration (Email/Password)
- [ ] `public/login.html` — Login page (Patient + Clinician)
- [ ] Role-based routing: `patient` → Patient Portal, `clinician` → Clinician Portal, `admin` → Admin
- [ ] Custom claims via Cloud Functions (requires Blaze plan upgrade)

### Phase 3: Backend / Data

- [ ] Upgrade Firebase to Blaze plan
- [ ] Deploy Cloud Functions (`functions/index.js` — already written)
  - `setUserRole` — Admin sets custom claims
  - `onPatientDataWrite` — HIPAA audit logger
  - `onUserCreate` — Auto-create user document
- [ ] Deploy Firestore security rules (`firestore/firestore.rules` — already written)
- [ ] Run seed script (`firestore/seed.js`) to populate initial data

### Phase 4: Content & Polish

- [ ] Favicon (generate from logo)
- [ ] Apple touch icon
- [ ] PWA manifest (`manifest.json`)
- [ ] Privacy Policy page (`privacy.html`)
- [ ] Accessibility Statement page (`accessibility.html`)
- [ ] Clinical Ethics page (`ethics.html`)
- [ ] Open Graph / social sharing meta tags
- [ ] 404 page

### Phase 5: Advanced Features

- [ ] Research module data from Firestore (dynamic, not static HTML)
- [ ] Patient data entry connected to Firestore
- [ ] HIPAA audit log viewer (admin only)
- [ ] Email capture / newsletter signup
- [ ] Support ticket system connected to Firestore

---

## 8. Rules for All Agents

### MUST DO

1. **Read this file first** before making any changes
2. **Use CSS variable references** in Tailwind config — NEVER hardcode hex colors
3. **Include theme.css, theme.js, and mobile-menu.js** on every new page
4. **Test on mobile** — every page must work on phone/tablet
5. **Deploy with** `npx firebase-tools deploy --only "hosting" --project bio-reversal-dev`
6. **Commit with descriptive messages** — what changed and why
7. **Push to master** — `git push origin master`
8. **Brand name is "Autism's Saving Grace"** — never use "BIO-REVERSAL"
9. **Font is Manrope** — always load from Google Fonts
10. **Respect prefers-reduced-motion** — wrap all animations in the media query check

### MUST NOT

1. **Do NOT delete or overwrite** `config/client.js` — it has live Firebase credentials
2. **Do NOT change the Firebase project ID** — it's `bio-reversal-dev`
3. **Do NOT deploy Cloud Functions** on the Spark plan — it will fail
4. **Do NOT use any JS framework** (React, Vue, etc.) — this is a vanilla HTML/CSS/JS site
5. **Do NOT install npm packages** in the `public/` directory — there is no build step
6. **Do NOT use inline hex colors** — always go through the theme CSS variable system
7. **Do NOT remove the mobile menu HTML** from any page
8. **Do NOT auto-sync** (`git add .`) without reviewing changes first

### Code Style (Ponytail Standard)

- Minimum viable code. No over-engineering.
- No abstractions that weren't requested.
- No new dependencies if they can be avoided.
- Native platform features before libraries.
- Mark intentional simplifications with `// ponytail:` comments.
- Delete code before adding code.

### Stitch Design Source

The UI designs come from Google Stitch:
- **Project**: https://stitch.withgoogle.com/projects/10617121613374052077
- **Design Language**: Material Design 3 with custom tonal palette
- **Key Patterns**: Bento grid layouts, asymmetric grids, sensory bar, utility sidebar
- When implementing new Stitch designs: extract the HTML, update branding to "Autism's Saving Grace", replace hex colors with CSS variable references, add theme/mobile-menu includes

---

## 9. GitHub Repository

### Remote

```
Origin: https://github.com/retrowebworks/Dr.-E-s-website..git
Branch: master
```

### Commit Convention

```
Feature: [description]           — New pages or capabilities
Fix: [description]               — Bug fixes
Tweak: [description]             — Visual/animation adjustments
Rename: [old] -> [new]           — Branding changes
```

### Git Workflow

```bash
# Always from C:\Users\Dad's PC\Desktop\Bio-Reversal
git add -A
git commit -m "Feature: [what was added]"
git push origin master
```

---

## 10. Quick Start for New Agents

```
1. Read THIS FILE completely
2. cd "C:\Users\Dad's PC\Desktop\Bio-Reversal"
3. git pull origin master
4. Make changes to files in public/
5. Test locally if needed (npx firebase-tools serve --only hosting)
6. Deploy: npx firebase-tools deploy --only "hosting" --project bio-reversal-dev
7. Verify at https://bio-reversal-dev.web.app
8. git add -A && git commit -m "Description" && git push origin master
```

---

*Last updated: 2026-07-03 by Antigravity (Gemini agent)*
*Session context: Conversation 5c840b6f-d5b9-4b77-aed9-fe308ff16d54*
