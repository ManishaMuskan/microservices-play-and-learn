const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Health check: OK");
});

app.listen(port, () => {
  console.log(`event bus listening on port ${port}`);
});
