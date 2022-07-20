const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const feed = require('./routes/feedRoutes');
const auth = require('./routes/authRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/feed', feed);
app.use('/auth', auth);

// Error handling 
app.use((err, req, res, next) => {
  console.log(err);
  const status = err.statusCode || 500;
  const message = err.message;
  const data = err.data;
  res.status(status).json({ message: message, data: data });
})

const mongoURL = 'mongodb+srv://lerry:iBkAIVhudv8qjX6v@nosql.6oz61.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(mongoURL)
  .then(() => app.listen(8080))
  .then(() => console.log('Connected to database, running on port 8080'))
  .catch(err => console.log(err));
