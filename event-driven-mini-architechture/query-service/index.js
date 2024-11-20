const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();

const port = 4003;
const posts = [];

app.use(cors());
app.use(bodyParser.json());

const handleEvent = (eventType, data) => {
  if (eventType === "postCreated") {
    const { title, id } = data;
    const post = {
      id,
      title,
      comments: [],
    };
    posts.push(post);
  }

  if (eventType === "commentCreated") {
    const { postId, id, status, content } = data;
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
    const { postId, id, status, content } = data;

    const associatedPost = posts.find((post) => post.id === postId);
    let commentToBeModerated = associatedPost.comments.find(
      (comment) => comment.id === id
    );

    commentToBeModerated.status = status;
  }
};

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

  handleEvent(eventType, req.body.data);

  // send response as it is a request handler
  res.send({});
});

app.listen(port, async () => {
  console.log(`Query Service listening on port ${port}`);

  try {
    const res = await axios.get("http://localhost:4000/events");

    for (let event of res.data) {
      console.log("Processing event:", event.event);

      handleEvent(event.event, event.data);
    }
  } catch (error) {
    console.log(error.message);
  }
});
