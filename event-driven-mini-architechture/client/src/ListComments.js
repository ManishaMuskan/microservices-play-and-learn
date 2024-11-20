import React from "react";

const ListComments = ({ comments }) => {
  return (
    <ul className='list-group my-2'>
      {comments.map((comment) => {
        let content;

        if (comment.status === "approved") {
          content = comment.content;
        }

        if (comment.status === "pending") {
          content = "This comment is awaiting moderation";
        }

        if (comment.status === "rejected") {
          content = "This comment has been rejected";
        }

        return (
          <li key={comment.id} className='list-group-item'>
            {content}
          </li>
        );
      })}
    </ul>
  );
};

export default ListComments;
