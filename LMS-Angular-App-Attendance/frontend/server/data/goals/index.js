const fs = require('fs')
const path = require('path')

// const goals = require("./json/goals.json");

const getAllGoals = async () => {
  const goalsData = await fs.readFileSync(path.join(__dirname, "json", "goals.json"), "utf8");
  const jsonGoalsData = JSON.parse(goalsData);
  return jsonGoalsData;
}

module.exports = {
  getAllGoals
}
