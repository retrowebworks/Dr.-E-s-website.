# BIO-REVERSAL: Design System
> **Source**: Stitch mockup → Google AI Studio (July 2026)  
> **Status**: Locked — approved visual direction  
> **Last Updated**: 2026-07-02

---

## 1. Color Palette

### Primary Theme: "Cosmic Slate" (Dark Mode — Default)

| Token | Name | Hex | Usage |
|---|---|---|---|
| `--color-bg-primary` | Near Black | `#030303` | Page background |
| `--color-text-primary` | White | `#ffffff` | Primary text, headings |
| `--color-accent-copper` | Copper | `#9a5d3e` | Primary CTAs, active nav underlines, highlights |
| `--color-accent-gold` | Dark Gold | `#7d6227` | Phase badges, secondary buttons, labels |
| `--color-accent-purple` | Muted Purple | `#584472` | Tertiary accent, support chat, subtle elements |
| `--color-text-muted` | Warm Gray | ~`#a0a0a0` | Secondary text, descriptions (derive from mockup) |
| `--color-border` | Dark Warm | ~`#2a2a2a` | Card borders, dividers (derive from mockup) |
| `--color-card-bg` | Slightly Lighter Black | ~`#0d0d0d` | Card backgrounds (derive from mockup) |

### Alternate Theme: "Cream Gallery" (Light Mode)

| Token | Hex (estimated) | Notes |
|---|---|---|
| `--color-bg-primary` | `#f5f0e8` or similar warm cream | Needs to be defined from Stitch |
| `--color-text-primary` | `#1a1a1a` | Dark text on light bg |
| `--color-accent-copper` | `#9a5d3e` | Same copper, works on both themes |

> **TODO**: Extract full Cream Gallery palette from Stitch mockup

---

## 2. Typography

| Element | Font | Weight | Size | Notes |
|---|---|---|---|---|
| **Body Text** | Abcdiatype | Regular (400) | 16px base | Primary typeface |
| **Headings (H1)** | Abcdiatype | Bold (700) | 36–42px | Page titles |
| **Headings (H2)** | Abcdiatype | SemiBold (600) | 28–32px | Section headings |
| **Labels / Tags** | Monospace or Small Caps | — | 11–13px | "PHASE 01", "MODULE 02", "CHRONOLOGICAL NODE STUDY 01" |
| **Navigation** | Abcdiatype | Medium (500) | 14–16px | Navbar links |
| **Buttons** | Abcdiatype | SemiBold (600) | 14px | CTA text |

### Font Source
- **Abcdiatype** — commercial typeface by ABC Dinamo
- **Licensing**: Must verify web font license before production use
- **Fallback stack**: `'Abcdiatype', 'Inter', 'Roboto', -apple-system, sans-serif`

> **TODO**: Confirm font licensing with doctor. If cost is a concern, Inter or DM Sans are strong free alternatives that maintain the aesthetic.

---

## 3. Component Design Tokens

### Cards
```
Background: slightly lighter than page bg (~#0d0d0d)
Border: 1px solid warm dark gray (~#2a2a2a)
Border-radius: 12px (estimated from mockup)
Padding: 24–32px
```

### Buttons — Primary CTA
```
Background: #9a5d3e (Copper)
Text: #ffffff
Border-radius: 8px
Padding: 12px 24px
Hover: lighten copper ~10%
```

### Buttons — Secondary / Outlined
```
Background: transparent
Border: 1px solid #9a5d3e or #7d6227
Text: #9a5d3e or #ffffff
```

### Navigation Bar
```
Background: #030303 (same as page)
Active link: copper underline or copper text (#9a5d3e)
Inactive link: white (#ffffff)
Height: ~64px
Position: sticky top
```

### Phase Timeline Cards
```
Layout: horizontal row, 4 cards
Each card: dark bg, subtle border, status indicator dot (copper/gold)
Label: small caps monospace ("PHASE 01")
Title: bold, truncated with ellipsis
Subtitle: muted text
```

---

## 4. Sensory Sanctuary Settings

This is a **first-class feature**, not an afterthought. It persists across sessions.

### Controls
| Setting | What it does | Storage |
|---|---|---|
| **Theme Toggle** | Switches between "Cosmic Slate" (dark) and "Cream Gallery" (light) | localStorage |
| **Calm Mode** | Reduces contrast, mutes colors, simplifies layout | localStorage |
| **Reduce Motion** | Disables all CSS animations and transitions | localStorage + `prefers-reduced-motion` |

### Implementation Notes
- Respect `prefers-reduced-motion` and `prefers-color-scheme` as defaults
- Override with user selection stored in localStorage
- If user is authenticated, persist preferences to their profile (Firestore)
- The "Sensory Buffer Status: Operational" bar in the mockup is a delightful touch — keep it

### Accessibility Baseline
- All text meets WCAG AA contrast ratios (4.5:1 for body, 3:1 for large text)
- Copper (#9a5d3e) on near-black (#030303) = ~4.1:1 — **borderline**, may need to lighten copper slightly for WCAG AA
- All interactive elements have focus indicators
- Skip-to-content link
- Semantic HTML throughout
- `aria-labels` on icon-only buttons

---

## 5. Layout Structure

### Global Layout
```
┌─────────────────────────────────────────────┐
│  Navigation Bar (sticky)                     │
│  [LOGO]  Research  Portals  About  Support  │
│                               [Patient Login]│
├─────────────────────────────────────────────┤
│                                             │
│  Main Content Area                          │
│  (max-width: ~900-1000px, centered)         │
│                                             │
│                          Utility Controls ──►│
│                          (Sensory Settings)  │
│                                             │
├─────────────────────────────────────────────┤
│  Footer                                     │
│  [LOGO] Privacy | Accessibility | Ethics    │
│                         © Bio-Reversal ASD  │
└─────────────────────────────────────────────┘
```

### Utility Controls Sidebar
- Fixed position, right side
- Collapsible on mobile
- Contains: Calm Mode toggle, Reduce Motion toggle
- Only visible on pages with heavy content (Research, Portals)

---

## 6. Iconography & Imagery

- **Brain illustration** in Research Library (wireframe/scientific style, not cartoon)
- **Charts/graphs** for biological marker trends (clean, clinical, light background even in dark mode)
- **Status indicators**: small colored dots (copper = active, muted = inactive)
- **No stock photos of people** — keep it abstract and scientific
- **Icon style**: line icons, minimal, consistent stroke weight

---

## 7. Reference

- **Inspiration site**: Etsy (warm, handcrafted, human — not sterile medical)
- **Stitch source**: AI Studio app ID `57b90434-e95e-4c5e-90b2-ad2ae556e061`
- **Brand name**: "BIO-REVERSAL" (caps in logo, title case elsewhere)
- **Tagline**: "Restoring Balance. Navigating Biological Data with Dignity."
