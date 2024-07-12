const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectToMongo() {
  try {
    await client.connect();
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

connectToMongo();

// Serve static files from the frontend
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Root route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Serve the frontend for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// POST endpoint for form submission
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const db = client.db('yourDatabaseName'); // Replace with your database name
    const collection = db.collection('contacts');
    
    await collection.insertOne({ name, email, subject, message });
    res.status(201).send('Contact saved');
  } catch (error) {
    res.status(500).send('Error saving contact');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
