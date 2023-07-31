const express = require("express");
const router = require("./routes");

const port = process.env.PORT || 4000;
const app = express();

router(app);

app.listen(port, () => {
  console.log("Servidor rodando na porta: " + port);
  console.log("http://localhost:" + port);
});
