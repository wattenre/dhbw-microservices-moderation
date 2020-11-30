const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const axios = require('axios');

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const status = data.content.includes('werbung') ? 'rejected' : 'approved';
    console.log('status', status);
    await axios.post('http://localhost:4005/events', {
      type: 'CommentModerated',
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content
      }
    });
  }
  console.log('Event received', req.body.type);

  res.send({});
});
  
app.listen(4003, () => {
  console.log('Listening on 4003');
});
