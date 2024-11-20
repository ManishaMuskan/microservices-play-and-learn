const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const { randomBytes } = require("crypto");
const cors = require("cors");

const app = express();
const port = 4000;
const PostsServiceBaseUrl = "http://localhost:4001";
const CommentsServiceBaseUrl = "http://localhost:4002";
const QueryServiceBaseUrl = "http://localhost:4003";
const ModerationServiceBaseUrl = "http://localhost:4004";

app.use(cors());
app.use(bodyParser.json());

const events = [];

app.get("/", (req, res) => {
  res.send("Health check: OK");
});

app.get("/events", (req, res) => {
  console.log("events----", events);
  res.send(events);
});

app.post("/events", (req, res) => {
  const event = req.body.event;
  console.log("event received and emitted the same -", req.body);

  events.push(req.body);

  axios.post(`${PostsServiceBaseUrl}/events`, req.body);
  axios.post(`${CommentsServiceBaseUrl}/events`, req.body);
  axios.post(`${QueryServiceBaseUrl}/events`, req.body);
  axios.post(`${ModerationServiceBaseUrl}/events`, req.body);

  res.status(200).json({ message: "event emitted", event });
});

app.listen(port, () => {
  console.log(`event bus listening on port ${port}`);
});
