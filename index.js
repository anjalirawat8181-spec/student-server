const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = 3000;

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Student Information Server');
});

app.get('/about', (req, res) => {
    res.send({
        name: "Anjali Rawat",
        rollNo: 23,
        course: "Computer Engineering"
    });
});

app.get('/contact', (req, res) => {
    res.send({
        email: "anjali@example.com"
    });
});

app.post('/register', (req, res) => {
    res.status(201).send('Student Registered');
});

app.put('/update', (req, res) => {
    res.status(200).send('Student Updated');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});