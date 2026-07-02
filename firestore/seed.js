/**
 * Firestore seed script — Bio-Reversal initial data
 *
 * Usage:
 *   GOOGLE_APPLICATION_CREDENTIALS=path/to/serviceAccountKey.json node firestore/seed.js
 *
 * ponytail: single script, no CLI framework, no env file parser — just run it
 */

const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

async function seed() {
  // --- /config/site ---
  await db.doc("config/site").set({
    name: "Bio-Reversal",
    tagline: "Evidence-Based Protocols for Biological Age Reversal",
    tier: "hipaa",
    theme: {
      primaryColor: "#1a5632",
      secondaryColor: "#d4af37",
      backgroundColor: "#fafaf5",
      fontFamily: "Georgia, serif",
    },
    features: {
      patientPortal: true,
      researchModules: true,
      ticketSystem: true,
      auditLogging: true,
    },
    nav: [
      { label: "Home", path: "/" },
      { label: "Research", path: "/research" },
      { label: "Patient Portal", path: "/portal" },
      { label: "Contact", path: "/contact" },
    ],
    disclaimer:
      "This site provides educational information only and does not constitute medical advice. Always consult a qualified healthcare professional before making health decisions.",
  });

  console.log("✓ config/site");

  // --- /research/sample-module ---
  await db.doc("research/sample-module").set({
    title: "Telomere Length Restoration Through Lifestyle Intervention",
    slug: "telomere-restoration",
    moduleNumber: 1,
    phase: "published",
    summary:
      "A comprehensive review of peer-reviewed studies demonstrating measurable telomere lengthening through diet, exercise, and stress management protocols.",
    content:
      "Telomeres, the protective caps on chromosome ends, shorten with age and are considered a key biomarker of biological aging. Recent longitudinal studies have shown that targeted lifestyle interventions can slow — and in some cases reverse — this shortening.",
    citations: [
      {
        authors: "Ornish D, Lin J, Daubenmier J, et al.",
        title: "Increased telomerase activity and comprehensive lifestyle changes: a pilot study",
        journal: "Lancet Oncol",
        year: 2008,
        doi: "10.1016/S1470-2045(08)70234-1",
      },
      {
        authors: "Epel ES, Blackburn EH, Lin J, et al.",
        title: "Accelerated telomere shortening in response to life stress",
        journal: "Proc Natl Acad Sci USA",
        year: 2004,
        doi: "10.1073/pnas.0407162101",
      },
    ],
    keyFindings: [
      "Comprehensive lifestyle changes increased telomerase activity by 29% in 3 months",
      "Chronic psychological stress correlates with shorter telomere length",
      "Plant-based diet and moderate exercise show strongest protective effects",
    ],
    publishedAt: admin.firestore.Timestamp.fromDate(new Date("2026-01-15")),
    status: "published",
  });

  console.log("✓ research/sample-module");
  console.log("Seed complete.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
