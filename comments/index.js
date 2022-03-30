const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();

const comments = {};

app.use(cors());
app.use(bodyParser.json());

app.get('/posts/:id/comments', (req, res) => {
  res.send(comments[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const { content } = req.body;
  const id = randomBytes(4).toString('hex');
  const postId = req.params.id;
  const postComments = comments[postId] || [];
  postComments.push({ id, content, status: 'pending' });
  comments[postId] = postComments;

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: { postId, id, content, status: 'pending' }
  }).catch(console.log);

  res.status(201).send(postComments);
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  if (type === 'CommentModerated') {
    const { postId, id, status } = data;
    const comment = comments[postId].find(({ id: commentId }) => id === commentId);
    comment.status = status;
    await axios.post('http://localhost:4005/events',
    { type: 'CommentUpdated', data: { ...comment, postId } })
    .catch(console.log);
  }
  res.send({});
});

app.listen(4001, () => {
  console.log('Listening 4001');
});