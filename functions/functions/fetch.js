const { storeData, clearData } = require("../utils/data-manipulation");
const db = require("../config/firebase-config");

/**
 * Converts a timestamp into a formatted date string.
 * @param {number} timestamp - The timestamp to convert.
 * @returns {string} The formatted date string.
 */
function convertTimeStamp(timestamp) {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
}

/**
 * Formats data by adding formatted timestamps to each SMS object.
 * @param {object} data - The data to format.
 * @returns {object} The formatted data object.
 */
function formatData(data) {
  const formattedData = {};

  Object.keys(data).forEach((key) => {
    const sms = data[key];
    const formattedTimestamp = convertTimeStamp(sms.timestamp);
    formattedData[key] = { ...sms, formattedTimestamp };
  });

  return formattedData;
}

/**
 * Formats 'sms' data and stores it in 'formatted_sms'.
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 */
exports.formatData = async (req, res) => {
  try {
    const snapshot = await db.ref("sms").once("value");
    const smsData = snapshot.val();

    if (!smsData) {
      res.status(404).send("No data found in 'sms' collection");
      return;
    }

    await clearData("formatted_sms");
    const formattedData = formatData(smsData);

    await storeData("formatted_sms", formattedData);

    res.send("Data formatted!");
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data: " + error.message);
  }
};

/**
 * Counts the number of entries in the 'sms' collection.
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 */
exports.countSMS = async (req, res) => {
  try {
    const snapshot = await db.ref("sms").once("value");
    const smsData = snapshot.val();

    if (!smsData) {
      res.status(404).send("No data found in 'sms' collection");
      return;
    }

    const count = Object.keys(smsData).length;

    res.status(200).json({ count });
  } catch (error) {
    console.error("Error counting SMS entries:", error);
    res.status(500).send("Error counting SMS entries: " + error.message);
  }
};

/**
 * Fetches all 'sms' and 'formatted_sms' entries.
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 */
exports.fetchAll = async (req, res) => {
  try {
    const [sms_snapshot, formattedSms_snapshot] = await Promise.all([
      db.ref("sms").once("value"),
      db.ref("formatted_sms").once("value"),
    ]);

    const smsData = sms_snapshot.val();
    const formattedSmsData = formattedSms_snapshot.val();

    res.json({ smsData, formattedSmsData });
  } catch (error) {
    console.error("Error fetching all SMS entries:", error);
    res.status(500).send("Error fetching all SMS entries: " + error.message);
  }
};
