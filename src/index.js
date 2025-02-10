//import { v4 as uuidv4, v4 } from 'uuid'; Not working

const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

let counter = 0;

app.get('/users/:id', (req, res) => {
	
    const { id } = req.params;
    const user = users.find(user => user.id === id);
    
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).send(user);
});

const users = [];

app.post('/users', (req, res) => {
	const { name, email } = req.body;
    
    if (!name || !email) {
        return res.status(400).json({ message: 'Input name and email' });
    }
    
    const newUser = {
        id: String(counter++),
        name,
        email
    };

    users.push(newUser);

    res.status(201).send(newUser)

});

app.put('/users/:id', (req, res) => {

    const { id } = req.params;
    const { name, email } = req.body;
    const user = users.find(user => user.id === id);
    
    if (!name || !email) {
        return res.status(400).json({ message: 'Input name and email' });
    }

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    user.name = name
    user.email = email

    res.status(200).send(user);

});

app.delete('/users/:id', (req, res) => {

    const { id } = req.params;
    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    users.splice(index, 1);

    res.status(204).end();
    
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing
