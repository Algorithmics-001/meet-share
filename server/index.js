const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let meetings = [];

// GET all meetings
app.get('/meet', (req, res) => {
  res.json(meetings);
});

// POST a new meeting
app.post('/meet', (req, res) => {
  const { name, time, url } = req.body;
  const newMeeting = { name, time, url };
  meetings.push(newMeeting);
  res.json(newMeeting);
});

// UPDATE a meeting
app.put('/meet/:id', (req, res) => {
  const id = req.params.id;
  const { name, time, url } = req.body;

  if (meetings[id]) {
    meetings[id] = { name, time, url };
    res.json(meetings[id]);
  } else {
    res.status(404).json({ error: 'Meeting not found' });
  }
});

// DELETE a meeting
app.delete('/meet/:id', (req, res) => {
  const id = req.params.id;

  if (meetings[id]) {
    const deletedMeeting = meetings.splice(id, 1);
    res.json(deletedMeeting[0]);
  } else {
    res.status(404).json({ error: 'Meeting not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
