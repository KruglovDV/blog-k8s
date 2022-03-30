const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
  const message = req.body;

  events.push(message);

  axios.post('http://localhost:4000/events', message).catch(console.log);
  axios.post('http://localhost:4001/events', message).catch(console.log);
  axios.post('http://localhost:4002/events', message).catch(console.log);
  axios.post('http://localhost:4003/events', message).catch(console.log);
  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('Listening 4005');
});