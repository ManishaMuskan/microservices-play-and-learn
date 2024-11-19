import React from 'react'

const ListComments = ({comments}) => {
  return (
    <ul className='list-group my-2'>{comments.map(comment => (
        <li key={comment.id} className='list-group-item'>{comment.content}</li>
    ))}</ul>
  )
}

export default ListComments