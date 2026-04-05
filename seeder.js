import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, 'backend', 'data.json');
let data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const firstNames = ["James", "Maria", "David", "Emma", "Michael", "Olivia", "Robert", "John", "Ava", "William", "Sophia", "Richard", "Isabella", "Charles", "Mia", "Joseph", "Charlotte", "Thomas", "Amelia", "Christopher", "Harper", "Daniel", "Evelyn", "Paul", "Abigail", "Mark", "Emily", "Donald", "Elizabeth", "George", "Sofia", "Kenneth", "Avery", "Steven", "Layla", "Matthew", "Chloe", "Anthony", "Ella", "Joshua"];
const lastNames = ["Smith", "Garcia", "Johnson", "Martinez", "Brown", "Jones", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Robinson", "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez", "King", "Wright", "Lopez", "Hill", "Scott", "Green", "Adams", "Baker"];

const generateStudents = (count) => {
  const generated = [];
  for (let i = 0; i < count; i++) {
    const fn = firstNames[i % firstNames.length];
    const ln = lastNames[(i * 3) % lastNames.length];
    const name = `${fn} ${ln}`;
    generated.push({
      id: 2000 + i,
      name,
      grade: (9 + (i % 4)) + 'th Grade',
      section: ['A', 'B', 'C', 'D'][i % 4],
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}@example.com`,
      phone: `+1 (555) ${100 + i}-${2000 + i}`,
      status: i % 8 === 0 ? 'Inactive' : 'Active'
    });
  }
  return generated;
};

data.students = generateStudents(40);
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log('Successfully injected 40 students into data.json');
