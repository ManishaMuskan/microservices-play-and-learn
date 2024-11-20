const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const port = 4004;
const eventBusBaseUrl = "http://localhost:4000";
const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("Health Check: OK");
});

app.post("/events", async (req, res) => {
  const eventType = req.body.event;

  if (eventType === "commentCreated") {
    let { id, content, postId, status } = req.body.data;

    status = content.includes("orange") ? "rejected" : "approved";

    await axios.post(`${eventBusBaseUrl}/events`, {
      event: "commentModerated",
      data: {
        id,
        content,
        postId,
        status,
      },
    });
  }

  res.send({});
});

app.listen(port, () => {
  console.log(`Moderation Service listening on port ${port}`);
});
