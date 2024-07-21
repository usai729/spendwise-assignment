const db = require("../config/firebase-config");

/**
 * Clears data from a specified collection.
 * @param {string} collectionName - The name of the collection to clear.
 */
async function clearData(collectionName) {
    const ref = db.ref(collectionName);
    await ref.remove();
}

/**
 * Stores data into a specified collection.
 * @param {string} collectionName - The name of the collection to store data in.
 * @param {any} data - The data to store.
 */
async function storeData(collectionName, data) {
    const ref = db.ref(collectionName);
    await ref.set(data);
}

module.exports = {
    clearData,
    storeData, // Add a trailing comma here
};
