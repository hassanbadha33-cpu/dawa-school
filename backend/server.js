const express = require('express');
const cors = require('cors');
const fs = require('fs/promises');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const dataPath = path.join(__dirname, 'data.json');

async function readData() {
  try {
    const raw = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return { students: [], teachers: [], classes: [] };
  }
}

async function writeData(data) {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf8');
}

// Students API
app.get('/api/students', async (req, res) => {
  const data = await readData();
  res.json(data.students);
});

app.post('/api/students', async (req, res) => {
  const data = await readData();
  const newStudent = { id: Date.now(), ...req.body };
  data.students.unshift(newStudent);
  await writeData(data);
  res.status(201).json(newStudent);
});

app.patch('/api/students/:id', async (req, res) => {
  const data = await readData();
  const id = parseInt(req.params.id);
  const index = data.students.findIndex(s => s.id === id);
  if (index !== -1) {
    data.students[index] = { ...data.students[index], ...req.body };
    await writeData(data);
    res.json(data.students[index]);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

// Teachers API
app.get('/api/teachers', async (req, res) => {
  const data = await readData();
  res.json(data.teachers);
});

app.post('/api/teachers', async (req, res) => {
  const data = await readData();
  const newObj = { id: Date.now(), ...req.body };
  data.teachers.unshift(newObj);
  await writeData(data);
  res.status(201).json(newObj);
});

// Classes API
app.get('/api/classes', async (req, res) => {
  const data = await readData();
  res.json(data.classes);
});

app.post('/api/classes', async (req, res) => {
  const data = await readData();
  const newObj = { id: Date.now(), ...req.body };
  data.classes.unshift(newObj);
  await writeData(data);
  res.status(201).json(newObj);
});

// Auth Fake API
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@gmail.com' && password === '1234') {
    res.json({ success: true, user: { email, role: 'admin', name: 'Admin User', token: 'mock-jwt-token' } });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
