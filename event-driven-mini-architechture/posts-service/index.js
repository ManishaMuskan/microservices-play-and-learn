const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");

const app = express();
const port = 4001;
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/", (req, res) => {
  res.send("Health check: OK");
});

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  res.status(201).send(posts[id]);
});

app.listen(port, () => {
  console.log(`posts service listening on port ${port}`);
});
