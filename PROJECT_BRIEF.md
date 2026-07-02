# BIO-REVERSAL: Project Brief
> **Project**: Biological Reversal ASD Ecosystem  
> **Client**: Medical Doctor (name TBD)  
> **Developer**: G&G (AI-assisted development)  
> **Created**: 2026-07-02  
> **Status**: Pre-Development — Research & Planning Phase

---

## 1. Vision Statement

**"Restoring Balance. Navigating Biological Data with Dignity."**

BIO-REVERSAL is a three-pillar ecosystem that challenges conventional wisdom on autism spectrum disorder (ASD) through clinical research, patient care, and economic empowerment of neurodiverse creators.

### The Three Pillars

| Pillar | Name | Purpose |
|---|---|---|
| 📖 | **The Knowledge Platform** | Research library, book content ("Autism's Saving Grace"), clinical framework for the biological reversal of ASD |
| 🏥 | **The Clinical Portal** | HIPAA-compliant patient assessment, biological marker tracking, clinician tools |
| 🎨 | **The Artism Marketplace** | Direct-to-buyer art marketplace where artists with autism sell their own work, creating economic participation and dignity |

The ecosystem is unified by a single thesis: **autism is biologically addressable, and autistic people are capable creators who deserve both clinical support and economic opportunity.**

### Supporting Layers
- **Neuro-inclusive UX** — every interface designed for neurodivergent users as primary users (backed by 54+ research sources)
- **Sensory Sanctuary Settings** — theme controls, calm mode, reduced motion across the entire platform
- (Future) **AI Research Librarian** — RAG-based search over the doctor's published content with citations
- **Book**: "Autism's Saving Grace: A New Biological Paradigm" (250-page draft exists)

---

## 2. Target Audiences

| Audience | Access Level | Primary Need |
|---|---|---|
| **General Public / Families** | Public (no auth) | Understanding the biological reversal framework |
| **Researchers** | Public (no auth) | Accessing the research library and citations |
| **Patients / Families (Registered)** | Authenticated | Onboarding, support tickets, personal resources |
| **Clinicians** | Authenticated (elevated) | Patient assessment portal, data entry, trend tracking |
| **Site Admin / Doctor** | Admin | Content management, patient data oversight |

---

## 3. Content Volume & Source Material

- **250-page book draft** (rough) — primary content source
- Content is structured chronologically across biological phases:
  - Phase 01: Genetic & Epigenetic Susceptibility (Pre-conception / Early Embryonic)
  - Phase 02: Prenatal Bio-Accumulation (Gestation Weeks 12–40)
  - Phase 03: Postnatal Toxicant Loading (Infancy, Months 0–24)
  - Phase 04: Chronic Neuro-Inflammatory Cascade (Toddlerhood to Adolescence)
- Research modules cover:
  - Neurobiological ASD Frameworks
  - Environmental Toxicant Interactions
  - (Additional modules expected)

---

## 4. Key Features (Phased)

### Phase 1: Foundation (MVP)
- [ ] Public-facing research library (structured, searchable)
- [ ] Homepage with hero messaging and navigation
- [ ] About page (doctor's credentials, mission, methodology)
- [ ] Design system implementation (dark theme, sensory settings)
- [ ] Legal disclaimers and content positioning
- [ ] Domain acquisition and hosting setup
- [ ] Email list capture (newsletter signup)

### Phase 2: Authentication & Portal
- [ ] User authentication (Patient Login, Clinician access)
- [ ] Patient onboarding flow (stepped process)
- [ ] Support ticket system
- [ ] Basic clinician portal (view-only patient data)

### Phase 3: Clinical Data
- [ ] Patient assessment entry forms
- [ ] Biological marker trend visualization
- [ ] HIPAA-compliant data storage and access controls
- [ ] Audit logging

### Phase 4: Intelligence Layer (Optional)
- [ ] RAG-based AI research assistant
- [ ] Citation-backed answers from the doctor's content
- [ ] Bibliography / reference index
- [ ] "I don't know" fallback (never guesses outside the content)

### Phase 5: Commerce (If Decided)
- [ ] Book sales integration
- [ ] Membership tier (if applicable)

---

## 5. Key Decisions Made

| Decision | Status | Notes |
|---|---|---|
| Backend: Google (Firebase/Cloud) | ✅ Decided | Minimal maintenance, scales automatically |
| HIPAA Compliance | ✅ Required | Real patient data will be handled in clinician portal |
| Design: Dark mode, warm palette | ✅ Locked (Stitch mockup complete) | Copper/bronze + near-black |
| Sensory Sanctuary Settings | ✅ Designed | Calm Mode, Reduce Motion, theme toggles |
| AI Assistant | ⏳ Under consideration | Liability concerns being weighed against impact |
| Membership Model | ⏳ TBD | Doctor considering but not committed |
| Domain | ⏳ Not acquired | Needs to be purchased |
| Book Sales | ⏳ Maybe | Doctor may want to sell book through the site |

---

## 6. Open Questions

1. **Doctor's name / credentials** — needed for About page and authority positioning
2. **Domain name** — what URL does the doctor want?
3. **Book title** — is "Bio-Reversal" the book title or just the platform name?
4. **AI Assistant** — go or no-go? Can be deferred to Phase 4
5. **Membership model** — free tier only? Paid tiers? What content is gated?
6. **Pricing** — development cost not yet discussed with client
7. **Timeline** — when does the doctor want to launch?
8. **Content pipeline** — who writes ongoing content? Doctor only, or collaborators?

---

## 7. Project Repository

```
Bio-Reversal/
├── PROJECT_BRIEF.md          ← You are here
├── CONTENT_GUARDRAILS.md     ← Do's and don'ts of content positioning
├── DESIGN_SYSTEM.md          ← Visual identity and tokens
├── ARCHITECTURE_BLUEPRINT.md ← Technical stack and decisions
├── HIPAA_COMPLIANCE.md       ← (Future) Compliance checklist
├── assets/                   ← (Future) Images, mockups, brand assets
├── content/                  ← (Future) Book chapters, research modules
└── src/                      ← (Future) Source code
```
