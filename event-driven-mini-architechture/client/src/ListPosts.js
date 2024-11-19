import React from "react";
import Comments from "./Comments";

const ListPosts = ({ posts }) => {
  return (
    <div className='d-flex m-3'>
      {posts.map((post) => (
        <div key={post.id} className='p-3 mx-1 border border-secondary'>
          <p>{post.title}</p>
          <Comments postId={post.id} comments={post.comments} />
        </div>
      ))}
    </div>
  );
};

export default ListPosts;
