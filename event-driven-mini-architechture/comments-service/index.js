const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 4002;
const eventBusBaseUrl = "http://localhost:4000";
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get("/", (req, res) => {
  res.send("Health check: OK");
});

app.get("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  res.send(commentsByPostId[postId] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const postId = req.params.id;

  let comments = commentsByPostId[postId] || [];
  const newComment = {
    id: commentId,
    content,
    postId,
    status: "pending",
  };
  comments.push(newComment);
  commentsByPostId[postId] = comments;

  await axios.post(`${eventBusBaseUrl}/events`, {
    event: "commentCreated",
    data: {
      ...newComment,
      postId,
    },
  });

  res.status(201).send(commentsByPostId[postId]);
});

app.post("/events", async (req, res) => {
  console.log("Event received - ", req.body.event);

  const eventType = req.body.event;

  if (eventType === "commentModerated") {
    const { id, content, postId, status } = req.body.data;
    let commentToBeUpdated = commentsByPostId[postId].find(
      (comment) => comment.id === id
    );

    commentToBeUpdated.status = status;

    await axios.post(`${eventBusBaseUrl}/events`, {
      event: "commentUpdated",
      data: commentToBeUpdated,
    });
  }

  res.send({});
});

app.listen(port, () => {
  console.log(`comments service listening on port ${port}`);
});
