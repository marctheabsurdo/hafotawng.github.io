const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB Atlas using Mongoose
mongoose.connect('mongodb+srv://ham:haotang@cluster0.lcwsx95.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch(error => {
  console.error('Error connecting to MongoDB Atlas:', error);
});



// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve static files from the css directory
app.use('/css', express.static(path.join(__dirname, 'css')));

// Serve static files from the js directory
app.use('/js', express.static(path.join(__dirname, 'js')));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());



// Define a Mongoose schema for your answers collection
const answerSchema = new mongoose.Schema({
  questionIndex: Number,
  answer: String
});

// Create a Mongoose model based on the schema
const Answer = mongoose.model('Answer', answerSchema);
// Route handler for submitting answers
app.post('/submit-answer', (req, res) => {
  

  // Create a new instance of the Answer model
  const newAnswer = new Answer({
    questionIndex: req.body.questionIndex,
    answer: req.body.answer,
  });

  // Save the answer to the database
  newAnswer.save()
    .then(() => {
      res.status(201).json({ message: 'Answer submitted successfully' });
    })
    .catch(error => {
      console.error('Error submitting answer to MongoDB Atlas', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Route handler for serving the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/letter', (req, res) => {
  res.sendFile(path.join(__dirname, 'letter.html'));
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
