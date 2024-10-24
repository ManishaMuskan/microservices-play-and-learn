const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");

const cors = require("cors");
const app = express();
const port = 4002;
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

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const postId = req.params.id;

  let comments = commentsByPostId[postId] || [];
  comments.push({
    id: commentId,
    content,
  });
  commentsByPostId[postId] = comments;

  res.status(201).send(commentsByPostId[postId]);
});

app.listen(port, () => {
  console.log(`comments service listening on port ${port}`);
});
