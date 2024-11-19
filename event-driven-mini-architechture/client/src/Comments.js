import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ListComments from './ListComments';

const Comments = ({postId}) => {
const [content, setContent] = useState('');
const [comments, setComments] = useState('');

const onSubmit = async (event) => {
    event.preventDefault();
    await axios.post(`http://localhost:4002/posts/${postId}/comments`, {content});
}

useEffect(() => {
    const fetchComments = async () => {
        const response = await axios.get(`http://localhost:4002/posts/${postId}/comments`);
        setComments(response.data);
    }

    fetchComments()
}, [postId]);

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
      {comments.length > 0 && <ListComments comments={comments}/>}
      <button type='submit' className='btn btn-primary'>
        Submit
      </button>
    </form>
  </div>
  )
}

export default Comments