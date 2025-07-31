// A simple Express backend for Wasel app demo
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

let rides = [];

app.post('/rides', (req, res) => {
  const newRide = { ...req.body, id: Date.now() };
  rides.push(newRide);
  res.status(201).json({ message: 'Ride posted successfully', ride: newRide });
});

app.get('/rides', (req, res) => {
  res.status(200).json(rides);
});

app.get('/search', (req, res) => {
  const { location = '', destination = '' } = req.query;
  const results = rides.filter(
    r => r.location.toLowerCase().includes(location.toLowerCase()) &&
         r.destination.toLowerCase().includes(destination.toLowerCase())
  );
  res.status(200).json(results);
});

app.get('/', (req, res) => {
  res.send('Wasel backend is running');
});

app.listen(PORT, () => {
  console.log(`🚗 Wasel backend running at http://localhost:${PORT}`);
});

module.exports = app;
