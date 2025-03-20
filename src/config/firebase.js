const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");

// Define service account file path
const serviceAccountPath = path.join(__dirname, "firebase_service_account.json");

// Debug: Check if file exists
if (!fs.existsSync(serviceAccountPath)) {
  console.error("❌ Firebase service account file not found:", serviceAccountPath);
  process.exit(1);
}

// Load Firebase JSON
const serviceAccount = require(serviceAccountPath);

// Debug: Log a message before initializing Firebase
console.log("✅ Initializing Firebase with service account...");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

console.log("✅ Firebase initialized successfully!");

module.exports = { admin, db };
