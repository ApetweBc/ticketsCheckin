const express = require('express');
const fs = require('fs');
const app = express();
const port = 3300;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Read the JSON file
app.get('/api/tickets', (req, res) => {
    fs.readFile('tickets.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading JSON file');
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Write to the JSON file
app.post('/api/tickets', express.json(), (req, res) => {
    fs.writeFile('tickets.json', JSON.stringify(req.body, null, 2), 'utf8', (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error writing to JSON file');
            return;
        }
        res.send('Data written to JSON file');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
