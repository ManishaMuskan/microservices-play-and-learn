import React, { useState } from "react";
import axios from "axios";
import Comments from "./Comments";

const Posts = () => {
  const [title, setTitle] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    await axios.post("http://localhost:4001/posts", { title });
  };

  return (
    <div className='p-3 m-0-auto'>
      <h3 className='center'>Create New Post</h3>
      <form onSubmit={onSubmit}>
        <div className='mb-3'>
          <label htmlFor='post' className='form-label'>
            Post Title
          </label>
          <input
            className='form-control'
            id='post'
            placeholder='Title of the post'
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Posts;
