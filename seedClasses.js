import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, 'backend', 'data.json');
let data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

data.classes = [
  {
    id: 1,
    name: '9th Grade Foundations',
    subject: 'Core Sciences',
    teacher: 'Sarah Jenkins',
    students: 145,
    room: 'Block A, Floor 1',
    time: '08:00 AM - 02:00 PM'
  },
  {
    id: 2,
    name: '10th Grade Prep',
    subject: 'Mathematics',
    teacher: 'David Anderson',
    students: 120,
    room: 'Block B, Lab 2',
    time: '09:00 AM - 03:00 PM'
  },
  {
    id: 3,
    name: '11th Grade Advanced',
    subject: 'Information Technology',
    teacher: 'Maria Garcia',
    students: 95,
    room: 'Block C, IT Lab 1',
    time: '08:30 AM - 01:30 PM'
  },
  {
    id: 4,
    name: '12th Grade Senior Seminar',
    subject: 'Humanities & Literature',
    teacher: 'James Smith',
    students: 80,
    room: 'Main Assembly Hall',
    time: '10:00 AM - 04:00 PM'
  }
];

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log('Successfully injected 4 core classes into data.json');
