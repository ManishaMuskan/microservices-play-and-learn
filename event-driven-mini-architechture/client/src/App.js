import React, { useEffect, useState } from "react";
import Posts from "./Posts";
import ListPosts from "./ListPosts";
import axios from "axios";
const queryServiceBaseUrl = "http://localhost:4003";

const App = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await axios.get(`${queryServiceBaseUrl}/posts`);
      console.log(posts);
      setPosts(posts.data);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <Posts />
      {posts.length > 0 && <ListPosts posts={posts} />}
    </div>
  );
};

export default App;
