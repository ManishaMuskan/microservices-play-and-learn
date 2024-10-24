import React, { useEffect, useState } from "react";
import Posts from "./Posts";
import ListPosts from "./ListPosts";
import axios from "axios";

const App = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await axios.get("http://localhost:4001/posts");
      setPosts(Object.values(posts.data));
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <Posts />
      {posts.length>0 && <ListPosts posts={posts} />}
    </div>
  );
};

export default App;
