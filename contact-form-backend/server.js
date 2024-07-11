const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Contact schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String
});

const Contact = mongoose.model('Contact', contactSchema);

// Routes
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();
    res.status(201).send('Contact saved');
  } catch (error) {
    res.status(400).send('Error saving contact');
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
