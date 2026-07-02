# BIO-REVERSAL: Architecture Blueprint
> **Purpose**: Technical architecture decisions for the BIO-REVERSAL platform  
> **Status**: DRAFT — Pre-development planning  
> **Last Updated**: 2026-07-02

---

## 1. Architecture Overview

```
┌──────────────────────────────────────────────────────┐
│                    VISITORS / USERS                    │
│            (Browser — Desktop & Mobile)                │
└────────────────────────┬─────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────┐
│              FIREBASE HOSTING (CDN)                    │
│         Static site served from global edge            │
│              Custom domain + SSL                       │
└────────────────────────┬─────────────────────────────┘
                         │
            ┌────────────┼────────────┐
            ▼            ▼            ▼
     ┌──────────┐ ┌──────────┐ ┌──────────────┐
     │ Public   │ │ Auth     │ │ Clinician    │
     │ Pages    │ │ Pages    │ │ Portal       │
     │          │ │          │ │              │
     │ Research │ │ Patient  │ │ Assessment   │
     │ About    │ │ Dashboard│ │ Data Entry   │
     │ Support  │ │ Profile  │ │ Trends       │
     └──────────┘ └────┬─────┘ └──────┬───────┘
                       │              │
                       ▼              ▼
              ┌──────────────────────────────┐
              │     FIREBASE AUTH             │
              │   Email/Password + Roles     │
              │   Custom claims: patient,    │
              │   clinician, admin           │
              └──────────────┬───────────────┘
                             │
                             ▼
              ┌──────────────────────────────┐
              │     CLOUD FIRESTORE          │
              │                              │
              │  /research    (public read)  │
              │  /users       (auth required)│
              │  /patients    (HIPAA zone)   │
              │  /tickets     (auth required)│
              │  /settings    (user prefs)   │
              └──────────────┬───────────────┘
                             │
                             ▼
              ┌──────────────────────────────┐
              │   CLOUD FUNCTIONS (if needed)│
              │                              │
              │  - Email notifications       │
              │  - Audit logging             │
              │  - Data validation           │
              │  - (Future) RAG API proxy    │
              └──────────────────────────────┘
```

---

## 2. Technology Stack

| Layer | Technology | Why |
|---|---|---|
| **Frontend** | HTML + Vanilla JS + Vanilla CSS | Ponytail: simplest stack, no framework overhead. Doctor needs zero maintenance. |
| **Hosting** | Firebase Hosting | CDN-backed, free tier, custom domain, SSL included, no server to manage |
| **Database** | Cloud Firestore | NoSQL, auto-scales, real-time sync, generous free tier |
| **Auth** | Firebase Authentication | Email/password, custom claims for roles, built-in session management |
| **Functions** | Cloud Functions for Firebase | Server-side logic only when needed (audit logs, email, etc.) |
| **Search** | (TBD) Algolia or Firestore queries | Full-text search over research content |
| **AI/RAG** | (Future, TBD) Vertex AI or Gemini API | Citation-backed search over doctor's content |
| **Email** | (TBD) Mailgun, SendGrid, or Firebase Extensions | Newsletter, notifications |
| **Payments** | (TBD) Stripe | Book sales, membership (if decided) |

### Why NOT a Framework?
- The doctor needs **zero maintenance**
- Static HTML + JS deployed to Firebase Hosting is the most stable, lowest-maintenance web architecture possible
- No npm dependencies to update, no build pipeline to break, no framework version to manage
- Content updates happen through a simple admin interface or CMS, not code changes
- ponytail: SPA framework is overkill for a content site with a few interactive portals

### Why NOT a Headless CMS?
- **Under consideration** — may add Sanity or similar for content management if the doctor will be writing frequently
- For launch, content can be managed as structured JSON/Markdown in Firestore
- Decision deferred until content update frequency is established

---

## 3. Firestore Data Model

### `/research/{moduleId}` (Public Read)
```json
{
  "title": "Neurobiological ASD Frameworks",
  "slug": "neurobiological-asd-frameworks",
  "moduleNumber": 1,
  "phase": "01",
  "summary": "Analysis of atypical neural connectivity patterns...",
  "content": "Full markdown/rich text content...",
  "citations": [
    {
      "id": "ref-001",
      "title": "Study Title",
      "authors": ["Author A", "Author B"],
      "journal": "Journal Name",
      "year": 2024,
      "doi": "10.xxxx/xxxxx",
      "url": "https://pubmed.ncbi.nlm.nih.gov/..."
    }
  ],
  "keyFindings": ["Synaptic pruning anomalies", "Excitatory/inhibitory imbalance"],
  "publishedAt": "2026-07-15T00:00:00Z",
  "updatedAt": "2026-07-15T00:00:00Z",
  "status": "published"
}
```

### `/users/{userId}` (Auth Required — Own Data Only)
```json
{
  "email": "user@example.com",
  "role": "patient",
  "displayName": "...",
  "onboardingStep": 2,
  "preferences": {
    "theme": "cosmic-slate",
    "calmMode": false,
    "reduceMotion": true
  },
  "createdAt": "...",
  "lastLogin": "..."
}
```

### `/patients/{patientId}` (HIPAA Zone — Clinician Access Only)
```json
{
  "identifier": "PTR-7729-A",
  "clinicianId": "uid-of-assigned-clinician",
  "markers": {
    "neurological_alpha": "Elevated - 4.2 μg/dL",
    "metabolicProcessing": 78,
    "sensoryThreshold": 62
  },
  "observations": [
    {
      "date": "2026-06-15",
      "note": "Patient demonstrated improved sensory regulation...",
      "author": "clinician-uid"
    }
  ],
  "trendData": [
    { "month": "Jan", "metabolic": 65, "sensory": 55 },
    { "month": "Feb", "metabolic": 68, "sensory": 58 }
  ]
}
```

### `/tickets/{ticketId}` (Auth Required)
```json
{
  "userId": "...",
  "subject": "Sanctuary settings issue",
  "description": "...",
  "status": "open",
  "createdAt": "...",
  "responses": []
}
```

---

## 4. Security Architecture

### Firestore Security Rules (Conceptual)
```
/research/*        → Public read, admin write only
/users/{userId}    → Read/write only by that user + admin
/patients/*        → Read/write only by assigned clinician + admin
/tickets/{id}      → Read/write by ticket owner + admin
```

### Role-Based Access (Firebase Custom Claims)
| Role | Custom Claim | Access |
|---|---|---|
| Visitor | (none — unauthenticated) | Public pages only |
| Patient | `role: "patient"` | Own profile, support tickets, onboarding |
| Clinician | `role: "clinician"` | Own patients' data, assessment forms |
| Admin | `role: "admin"` | Everything, content management |

### HIPAA Considerations (See HIPAA_COMPLIANCE.md for full details)
- All `/patients/*` data encrypted at rest (Firestore default: AES-256)
- All connections over HTTPS (Firebase default)
- Audit log every read/write to patient data (Cloud Function trigger)
- No patient data in client-side logs or error reporting
- BAA with Google Cloud required before storing PHI
- Access review process (who has clinician access, reviewed quarterly)

---

## 5. Deployment & Maintenance

### Deployment
```bash
# One-time setup
firebase init hosting
firebase init firestore
firebase init functions
firebase init auth

# Deploy
firebase deploy
```

### Maintenance Model (Doctor's Perspective)
- **Content updates**: Through admin panel (web-based, no code)
- **Patient data**: Through clinician portal (web-based, no code)
- **Site updates**: Deployed by developer (you) when needed
- **Backups**: Firestore automatic backups + scheduled exports to Cloud Storage
- **Monitoring**: Firebase Console for usage, errors, auth events
- **Cost**: Firebase Blaze plan (pay-as-you-go) — likely $5–30/month for this traffic level

---

## 6. Future: RAG Architecture (If Approved)

```
User Query → Cloud Function → Gemini API (with grounding)
                                    ↓
                            Search Firestore /research/*
                                    ↓
                            Return answer + citations
                                    ↓
                            Display with source links
```

### Key Constraints
- Model grounded ONLY on `/research/*` content (never external)
- Every response includes citation(s)
- System prompt: "You are a research librarian. You find and cite what the doctor has published. You never give medical advice. If the answer is not in the research library, say so."
- Fallback: "I don't have information on that topic in the research library."

---

## 7. Domain & Hosting Checklist

- [ ] Choose domain name (e.g., bioreversal.com, bio-reversal.com, biologicalreversal.com)
- [ ] Purchase domain (Google Domains, Namecheap, or Cloudflare Registrar)
- [ ] Point DNS to Firebase Hosting
- [ ] SSL certificate (automatic with Firebase)
- [ ] Set up Firebase project in Google Cloud Console
- [ ] Enable Firestore, Auth, Hosting, Functions
- [ ] Configure Firebase Blaze plan (required for Functions)
- [ ] (Later) Sign Google Cloud BAA for HIPAA compliance
