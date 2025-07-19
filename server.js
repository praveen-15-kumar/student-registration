const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Student = require('./models/Student');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Use MongoDB URI from environment variable
const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/students';

mongoose.connect(mongoURL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// ✅ POST: Add student
app.post('/students', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send({ error: 'Failed to save student' });
  }
});

// ✅ GET: Get all students
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.send(students);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch students' });
  }
});

// ✅ Dynamic PORT for Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
