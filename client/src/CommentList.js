import React from 'react';

export default ({ comments }) => {
  const renderedComments = comments.map(comment => {
    let text;

    if (comment.status === 'approved') {
      text = comment.content;
    }

    if (comment.status === 'pending') {
      text = 'This comment is awaiting moderation';
    }

    if (comment.status === 'rejected') {
      text = 'This comment has been rejected';
    }

    return <li key={comment.id}>
      {text}
      </li>;
  })
  return <ul>{renderedComments}</ul>
};