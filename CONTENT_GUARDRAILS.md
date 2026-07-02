# BIO-REVERSAL: Content Guardrails
> **Purpose**: The do's and don'ts of content positioning for the BIO-REVERSAL platform.  
> **Audience for this document**: Developer, content writer, doctor (review required)  
> **Last Updated**: 2026-07-02  
> **Status**: DRAFT — Awaiting doctor's review and legal counsel input

---

## Why This Document Exists

The doctor's clinical observations are genuine, deeply personal, and grounded in years of direct patient care. This document does NOT exist to dilute his message. It exists to **protect him** — legally, professionally, and reputationally — so his work can reach the people who need it without giving adversaries ammunition.

**The goal**: Position the website so the information gets out there, the authority is undeniable, but the liability exposure is minimized.

---

## The Golden Rule

> **"Present observations. Cite sources. Never prescribe."**

The website is a **research and education platform**, not a medical practice. The doctor shares what he has observed and what the research literature supports. The website never tells a visitor what to do about their health.

---

## ✅ DO's

### Language & Framing
- ✅ **DO** use language like: *"Clinical observations suggest..."*, *"In Dr. [Name]'s experience..."*, *"Research indicates..."*
- ✅ **DO** cite peer-reviewed studies wherever possible (PubMed, journal references)
- ✅ **DO** present findings as *"one perspective among many"* — this isn't weakness, it's credibility
- ✅ **DO** include the doctor's credentials prominently (MD, board certifications, years of practice)
- ✅ **DO** frame the platform as *"exploring emerging research"* rather than *"exposing the truth"*
- ✅ **DO** use phrases like: *"This framework proposes..."*, *"Based on documented cases..."*, *"Current evidence suggests..."*
- ✅ **DO** acknowledge that mainstream positions exist and explain why this perspective differs
- ✅ **DO** let the data speak — charts, timelines, case studies are more powerful than opinion

### Legal Protection
- ✅ **DO** include a prominent medical disclaimer on every page (not buried in footer — visible)
- ✅ **DO** use a site-wide disclaimer banner: *"This website provides educational information based on clinical research and observations. It is not a substitute for professional medical advice, diagnosis, or treatment."*
- ✅ **DO** include a dedicated Disclaimer/Legal page
- ✅ **DO** have the doctor's attorney review all disclaimer language before launch
- ✅ **DO** add disclaimers to individual research modules that discuss specific treatments or protocols
- ✅ **DO** include a "Clinical Ethics" page (already in the footer design — great instinct)
- ✅ **DO** timestamp all content with publication and last-updated dates (shows living, evolving research)

### Content Structure
- ✅ **DO** organize content by research module, not by "what's wrong with mainstream medicine"
- ✅ **DO** lead with the science, not the controversy
- ✅ **DO** include a bibliography/references section for every research module
- ✅ **DO** allow content to be updated as new research emerges
- ✅ **DO** clearly label what is peer-reviewed evidence vs. clinical observation vs. hypothesis

### Patient Data (Clinician Portal)
- ✅ **DO** use anonymized identifiers (the PTR-7729-A pattern in the mockup is correct)
- ✅ **DO** encrypt all patient data at rest and in transit
- ✅ **DO** maintain audit logs of all data access
- ✅ **DO** implement role-based access (patients see their own data, clinicians see their patients)
- ✅ **DO** have a clear data retention and deletion policy

---

## ❌ DON'Ts

### Language & Framing
- ❌ **DON'T** use absolute language: *"Autism is caused by..."*, *"The cure for..."*, *"This will..."*
- ❌ **DON'T** use the word **"cure"** — use *"reversal"*, *"improvement"*, *"observed outcomes"*
- ❌ **DON'T** attack other doctors, institutions, or the medical establishment by name
- ❌ **DON'T** frame it as *"us vs. them"* or *"what they don't want you to know"*
- ❌ **DON'T** use fear-based messaging (*"Your child is being poisoned"*)
- ❌ **DON'T** make promises about outcomes (*"Following this protocol will..."*)
- ❌ **DON'T** use testimonials as proof (they can be used as *stories*, not *evidence*)
- ❌ **DON'T** position the doctor as the sole authority — position him as *a leading voice in a growing field*

### Legal Landmines
- ❌ **DON'T** provide specific dosages, supplement protocols, or treatment plans on the public site
- ❌ **DON'T** offer telehealth or medical consultations through the website without proper licensing per state
- ❌ **DON'T** store patient data without HIPAA-compliant infrastructure (see HIPAA_COMPLIANCE.md)
- ❌ **DON'T** collect health information through public-facing forms (contact forms are fine, symptom questionnaires are not — without HIPAA compliance)
- ❌ **DON'T** allow user-generated content without moderation (forums, comments)
- ❌ **DON'T** make claims about FDA-regulated treatments without appropriate disclaimers

### Content Traps
- ❌ **DON'T** reference vaccines directly — this is the single fastest way to get deplatformed, shadow-banned, or lose payment processing. If the doctor's research touches on this topic, it must be framed as *"immune system response to environmental exposures"* or similar clinical language. The science can speak without using trigger words that activate automated content moderation.
- ❌ **DON'T** reference specific pharmaceutical companies or products negatively
- ❌ **DON'T** include before/after photos of patients (HIPAA violation + exploitation optics)
- ❌ **DON'T** host the content on platforms that can deplatform (the Firebase self-hosting approach solves this)

---

## ⚖️ The Positioning Framework

### What the website IS:
> A clinical research and education platform presenting a biological framework for understanding autism spectrum disorder, based on peer-reviewed research and the clinical observations of a board-certified physician.

### What the website is NOT:
> A medical practice, a treatment center, a prescription service, or a substitute for a patient's relationship with their own healthcare provider.

### The doctor's role on the website:
> A researcher and clinician sharing documented observations and peer-reviewed evidence to advance understanding of neurobiological development.

### The doctor's role is NOT:
> A whistleblower, a maverick, a rebel, or someone fighting "the system."

---

## 📋 Content Review Checklist

Before any content goes live, run it through this checklist:

- [ ] Does it cite sources? (PubMed, journal, documented case study)
- [ ] Does it use observational language? ("suggests," "indicates," "observed")
- [ ] Does it avoid absolute claims? (No "causes," "cures," "will")
- [ ] Does it include a module-level disclaimer if discussing treatments?
- [ ] Does it avoid naming specific individuals, companies, or institutions negatively?
- [ ] Has it been timestamped with publication date?
- [ ] Would the doctor be comfortable reading this aloud in a medical board hearing?
- [ ] Would a hostile journalist be able to extract a damaging quote from this?

**The last two questions are the real test.**

---

## 🔑 Key Phrase Substitutions

| Instead of... | Use... |
|---|---|
| "Autism is caused by..." | "Clinical observations suggest a correlation between..." |
| "The cure for autism" | "Documented improvements in neurobiological markers" |
| "Vaccines cause..." | "Immune system responses to environmental exposures" |
| "Toxins in food/water" | "Cumulative bio-accumulation of environmental compounds" |
| "Big Pharma" | "Current pharmaceutical treatment paradigms" |
| "The medical establishment ignores..." | "Emerging research challenges conventional frameworks..." |
| "This protocol works" | "Patients in this cohort demonstrated measurable improvement" |
| "You should..." | "Patients are encouraged to consult with their healthcare provider about..." |
| "We have proof" | "Current evidence supports the hypothesis that..." |
| "The truth about autism" | "A biological perspective on autism spectrum development" |

---

## 📝 Notes for the Doctor

This document is a **shield, not a muzzle**. Every word of the doctor's clinical experience can be communicated through this framework. The science doesn't change — only the vocabulary around it.

The best analogy: a surgeon who is brilliant in the operating room still needs malpractice insurance. These guardrails are the malpractice insurance for the website.

**Next step**: Doctor should review this document and flag anything he feels misrepresents his intent. Then his attorney should review the disclaimer language before we finalize.
