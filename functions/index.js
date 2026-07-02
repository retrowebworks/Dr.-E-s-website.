const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { onDocumentWritten } = require("firebase-functions/v2/firestore");
// ponytail: v1 auth triggers — v2 auth triggers exist but are less battle-tested; upgrade when stable
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

// --- Valid roles ---
const VALID_ROLES = ["patient", "clinician", "admin"];

// ============================================================
// setUserRole — Admin-only callable. Sets custom claims on user.
// ============================================================
exports.setUserRole = onCall(async (request) => {
  // Auth gate
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Must be signed in.");
  }
  if (request.auth.token.role !== "admin") {
    throw new HttpsError("permission-denied", "Admin only.");
  }

  const { uid, role } = request.data;

  // Input validation — never lazy here
  if (!uid || typeof uid !== "string") {
    throw new HttpsError("invalid-argument", "uid is required and must be a string.");
  }
  if (!role || !VALID_ROLES.includes(role)) {
    throw new HttpsError("invalid-argument", `role must be one of: ${VALID_ROLES.join(", ")}`);
  }

  // Verify target user exists
  try {
    await admin.auth().getUser(uid);
  } catch (err) {
    throw new HttpsError("not-found", `User ${uid} not found.`);
  }

  await admin.auth().setCustomUserClaims(uid, { role });

  // Keep Firestore user doc in sync
  await db.doc(`users/${uid}`).set({ role }, { merge: true });

  return { message: `Role '${role}' set for user ${uid}.` };
});

// ============================================================
// onPatientDataWrite — HIPAA audit logger on /patients/{patientId}
// ============================================================
exports.onPatientDataWrite = onDocumentWritten("patients/{patientId}", async (event) => {
  const before = event.data.before;
  const after = event.data.after;

  let action;
  if (!before.exists && after.exists) action = "create";
  else if (before.exists && !after.exists) action = "delete";
  else action = "update";

  // ponytail: event.authType/authId not available in v2 firestore triggers;
  // capturing what we can. Full user attribution requires client-side metadata or
  // wrapping writes in callables. Upgrade path: callable wrapper for patient writes.
  const auditEntry = {
    action,
    documentPath: `patients/${event.params.patientId}`,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    before: before.exists ? before.data() : null,
    after: after.exists ? after.data() : null,
    // ponytail: userId/userRole unavailable from background triggers; add lastModifiedBy field on client writes
    userId: after.exists ? (after.data().lastModifiedBy || null) : (before.exists ? (before.data().lastModifiedBy || null) : null),
    userRole: after.exists ? (after.data().lastModifiedByRole || null) : null,
  };

  await db.collection("audit_log").add(auditEntry);
});

// ============================================================
// onUserCreate — Auth trigger. Creates default /users/{uid} doc.
// ============================================================
// ponytail: using v1 auth trigger — proven stable, minimal code
exports.onUserCreate = functions.auth.user().onCreate(async (user) => {
  await db.doc(`users/${user.uid}`).set({
    email: user.email || null,
    displayName: user.displayName || null,
    role: "visitor",
    preferences: {},
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
});
