const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    setTimeout(next, 5000);
});

const jsonData = [
    {
        email: 'jim@gmail.com',
        number: '221122',
    },
    {
        email: 'jam@gmail.com',
        number: '830347',
    },
    {
        email: 'john@gmail.com',
        number: '221122',
    },
    {
        email: 'jams@gmail.com',
        number: '349425',
    },
    {
        email: 'jams@gmail.com',
        number: '141424',
    },
    {
        email: 'jill@gmail.com',
        number: '822287',
    },
    {
        email: 'jill@gmail.com',
        number: '822286',
    },
];

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidNumber = (number) => /^\d+$/.test(number);

app.post('/api/search', (req, res) => {
    const { email, number } = req.body;

    if (!email && !number) {
        return res.status(400).json({ error: 'Missing required fields: email and number' });
    }

    if (!email) {
        return res.status(400).json({ error: 'Missing required fields: email' });
    }

    if (!number) {
        return res.status(400).json({ error: 'Missing required fields: number' });
    }

    if (email && !isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    if (number && !isValidNumber(number)) {
        return res.status(400).json({ error: 'Invalid number format. Numbers only.' });
    }

    const results = jsonData.filter((user) => {
        const userNumber = String(user.number);
        return (
            (!email || user.email.toLowerCase().includes(email.toLowerCase())) &&
            (!number || userNumber.includes(number))
        );
    });

    if (results.length === 0) {
        return res.status(404).json({ error: 'No matching results found' });
    }

    return res.json({ data: results });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));