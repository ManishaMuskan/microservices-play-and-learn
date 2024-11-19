const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const { randomBytes } = require("crypto");
const cors = require("cors");

const app = express();
const port = 4000;
const basePostsServiceUrl = "http://localhost:4001";
const baseCommentsServiceUrl = "http://localhost:4002";
const baseQueryServiceUrl = "http://localhost:4003";

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Health check: OK");
});

app.post("/events", (req, res) => {
  const event = req.body.event;
  console.log("event received and emitted the same -", req.body);

  axios.post(`${basePostsServiceUrl}/events`, req.body);
  axios.post(`${baseCommentsServiceUrl}/events`, req.body);
  axios.post(`${baseQueryServiceUrl}/events`, req.body);

  res.status(200).json({ message: "event emitted", event });
});

app.listen(port, () => {
  console.log(`event bus listening on port ${port}`);
});
