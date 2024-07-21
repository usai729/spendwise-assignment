/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const functions = require("firebase-functions");

const insertFunctions = require("./functions/insert");
const fetchFunctions = require("./functions/fetch");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.addData = functions.https.onRequest(insertFunctions.addData);
exports.formatData = functions.https.onRequest(fetchFunctions.formatData);
exports.countsms = functions.https.onRequest(fetchFunctions.countSMS);
exports.fetchAll = functions.https.onRequest(fetchFunctions.fetchAll);
