const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const { randomBytes } = require("crypto");
const cors = require("cors");

const app = express();
const port = 4001;
const eventBusBaseUrl = "http://localhost:4000";
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/", (req, res) => {
  res.send("Health check: OK");
});

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  await axios.post(`${eventBusBaseUrl}/events`, {
    event: "postCreated",
    data: posts[id],
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Event received - ", req.body.event);
  res.status(200).json({
    message: "Event received",
    name: req.body.event,
    data: req.body.data,
  });
});

app.listen(port, () => {
  console.log(`posts service listening on port ${port}`);
});
