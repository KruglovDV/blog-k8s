import React, { useState } from 'react';
import axios from 'axios';

export default ({ postId }) => {
  const [content, setContent] = useState('');
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://posts.com/posts/${postId}/comments`, { content });
    setContent('');
  }
  return <div>
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <lable>New comment</lable>
        <input className="form-control" onChange={e => setContent(e.target.value)} value={content} />
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  </div>
}