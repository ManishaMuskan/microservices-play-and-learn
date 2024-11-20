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
    const postTitle = req.body.data.title;
    const postId = req.body.data.id;
    const post = {
      id: postId,
      title: postTitle,
      comments: [],
    };
    posts.push(post);
  }

  if (eventType === "commentCreated") {
    const { postId, id, status, content } = req.body.data;
    for (let post of posts) {
      if (post.id === postId) {
        const comment = {
          postId,
          id,
          status,
          content,
        };
        post.comments.push(comment);
      }
    }
  }

  if (eventType === "commentUpdated") {
    const { postId, id, status, content } = req.body.data;
    console.log(posts, postId, id, status, content);

    const associatedPost = posts.find((post) => post.id === postId);
    let commentToBeModerated = associatedPost.comments.find(
      (comment) => comment.id === id
    );

    commentToBeModerated.status = status;
  }

  // send response as it is a request handler
  res.send({});
});

app.listen(port, () => {
  console.log(`Query Service listening on port ${port}`);
});
