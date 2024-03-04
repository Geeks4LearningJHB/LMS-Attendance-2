const jsonServer = require("json-server");
const middleware = jsonServer.defaults();
const server = jsonServer.create();
const { getAllGoals } = require("./data/goals/index");
const { getAttendence } = require("./data/attendences/index");

server.use(middleware);
server.use(jsonServer.bodyParser);
server.set("PORT", 58760)

// const useData = require("../server/data/goals");
server.get("/api/goals", async (req, res, next) => {
  const goalsData = await getAllGoals();
  res.status(200).send(goalsData.goals);
});

server.get("/api/attendance", async (req, res, next) => {
  const attendanceData = await getAttendence();
  res.status(200).send(attendanceData.data.attendances);
});

server.listen(server.get("PORT"), () => {
  console.log(`JSON Server Listening on port ${server.get("PORT")}`);
});
