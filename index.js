const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = 3000;

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

/* =========================
   STUDENT DATA (ARRAY)
========================= */
let students = [];

/* =========================
   ROUTES
========================= */

// Home → loads form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Form submission → ADD student
app.post('/submit', (req, res) => {
  const { name, branch, year } = req.body;

  const newStudent = {
    id: students.length + 1,
    name,
    branch,
    year
  };

  students.push(newStudent);

  res.send(`
    <h1>Student Added ✅</h1>
    <p><b>Name:</b> ${name}</p>
    <p><b>Branch:</b> ${branch}</p>
    <p><b>Year:</b> ${year}</p>
    <br>
    <a href="/students">View All Students</a>
  `);
});

// View all students (INTERMEDIATE FEATURE 🔥)
app.get('/students', (req, res) => {
  let output = "<h1>All Students</h1>";

  students.forEach(s => {
    output += `
      <p>
        ID: ${s.id} <br>
        Name: ${s.name} <br>
        Branch: ${s.branch} <br>
        Year: ${s.year}
      </p>
      <hr>
    `;
  });

  res.send(output);
});

// 404
app.use((req, res) => {
  res.status(404).send("Route not found ❌");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});