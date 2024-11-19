const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const port = 4003;
const posts = [];

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Health check: OK");
});

/**
 * Returns all posts with comments
 */
app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

/**
 * Analyze event and take action based on event
 */
app.post("/events", (req, res) => {
  const eventType = req.body.event;

  if (eventType === "postCreated") {
    const postId = req.body.data.id;
    const postTitle = req.body.data.title;
    const post = {
      id: postId,
      title: postTitle,
      comments: [],
    };
    posts.push(post);
    console.log(posts);
  }

  if (eventType === "commentCreated") {
    console.log(req.body);
    const postId = req.body.data.postId;
    const commentId = req.body.data.id;
    const commentContent = req.body.data.content;

    for (let post of posts) {
      if (post.id === postId) {
        post.comments.push({ id: commentId, content: commentContent });
      }
    }

    console.log(posts);
  }

  // send response as it is a route handler
  res.send({});
});

app.listen(port, () => {
  console.log(`Query Service listening on port ${port}`);
});
