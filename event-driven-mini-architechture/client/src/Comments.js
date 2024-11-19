import axios from "axios";
import React, { useState } from "react";
import ListComments from "./ListComments";

const Comments = ({ postId, comments }) => {
  const [content, setContent] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    await axios.post(`http://localhost:4002/posts/${postId}/comments`, {
      content,
    });
  };

  return (
    <div className='p-3 m-0-auto'>
      <form onSubmit={onSubmit}>
        <div className='mb-3'>
          <label htmlFor='comment' className='form-label'>
            <h6 className='center'>Add Comment</h6>
          </label>
          <input
            className='form-control'
            id='comment'
            placeholder='Add comment to the post'
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          add
        </button>
      </form>
      {comments.length > 0 && <ListComments comments={comments} />}
    </div>
  );
};

export default Comments;
