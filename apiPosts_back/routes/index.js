const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./router");

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(cors());
  app.use(routes);
};
