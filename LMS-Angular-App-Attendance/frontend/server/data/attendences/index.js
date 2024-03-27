const fs = require('fs')
const path = require('path')

const getAttendence = async () => {
  const attendenceData = await fs.readFileSync(path.join(__dirname, "json", "getAttendences.json"), "utf8");
  const jsonAttendenceData = JSON.parse(attendenceData);
  return jsonAttendenceData;
}

module.exports = {
    getAttendence
}