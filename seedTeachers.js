import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, 'backend', 'data.json');
let data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const firstNames = ["Ahmed", "Fatima", "Ibrahim", "Amina", "Yusuf", "Khadija", "Omar", "Zainab", "Ali", "Hawa", "Hassan", "Aisha"];
const lastNames = ["Mahmoud", "Siraad", "Farah", "Jama", "Hussein", "Ali", "Osman", "Abdi", "Hassan", "Mohamed"];
const subjects = ["Mathematics", "Science", "History", "Literature", "Physical Ed", "Geography"];

const generateTeachers = (count) => {
  const generated = [];
  for (let i = 0; i < count; i++) {
    const fn = firstNames[i % firstNames.length];
    const ln = lastNames[(i * 3) % lastNames.length];
    const subject = subjects[i % subjects.length];
    generated.push({
      id: 5000 + i,
      name: `${fn} ${ln}`,
      role: i === 0 ? 'Head of Dept' : 'Faculty',
      subject,
      qualification: 'M.Ed. ' + subject,
      experience: 3 + (i % 10) + ' Years',
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}@dawa.edu`,
      phone: `+1 (555) ${300 + i}-${5000 + i}`,
      address: `Apt ${i + 1}, Faculty Quarters`,
      classes: 2 + (i % 3)
    });
  }
  return generated;
};

// Reset or populate teachers
data.teachers = generateTeachers(15);
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log('Successfully injected 15 outstanding teachers into data.json');
