const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'https://aditya-dangi-portfolio.onrender.com',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));

// MongoDB connection
const dbURI = process.env.MONGO_URI;
let db;

// Connect to MongoDB
MongoClient.connect(dbURI)
.then(client => {
  console.log('MongoDB connected');
  db = client.db('Aditya1478'); // Replace with your database name
})
.catch(err => console.error('MongoDB connection error:', err));

// Serve static files from the React frontend build folder
const staticFilesPath = path.join(__dirname, '../frontend/build');
app.use(express.static(staticFilesPath));

// API route for saving contact form data
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    const newContact = { name, email, subject, message };
    await db.collection('contacts').insertOne(newContact); // Insert into "contacts" collection
    res.status(201).send('Contact saved');
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(400).send('Error saving contact');
  }
});

// Default route handler for all other GET requests
app.get('*', (req, res) => {
  res.sendFile(path.join(staticFilesPath, 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
