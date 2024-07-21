const sms = require("../sample data/sms.json");
const { clearData, storeData } = require("../utils/data-manipulation");

exports.addData = async (req, res) => {
  try {
    await clearData("sms");
    await clearData("formatted_sms");

    await storeData("sms", sms.sms);

    res.status(200).send("Data added successfully");
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).send("Error adding data: " + error.message);
  }
};
