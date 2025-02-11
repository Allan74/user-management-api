const express = require('express')
const usersRouter = express.Router();

const users = [
    {id: '1', name: "Alice", age: 25},
    {id: '2', name: "Bob", age: 30}
];

usersRouter.get('/', (req, res) => {
    let responseText = "User List:\n";
    users.forEach(user => {
        responseText += `ID: ${user.id}, Name: ${user.name}, Age: ${user.age}\n`;
    });
    res.send(responseText);
});

// ✅ GET /users/:id (Fetch a single user by ID)
usersRouter.get('/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (user) {
        res.send(`ID: ${user.id}, Name: ${user.name}, Age: ${user.age}`);
    } else {
        res.status(404).send("User not found");
    }
});

// ✅ POST /users (Create a new user)
usersRouter.post('/', (req, res) => {
    const { name, age } = req.query;
    
    if (!name || !age) {
        return res.status(400).send("Both name and age are required.");
    }

    const newUser = {
        id: (users.length + 1).toString(),
        name: name,
        age: age
    };

    users.push(newUser);
    res.status(201).send(`User ${name} added successfully!`);
});

// ✅ PUT /users/:id (Update a user)
usersRouter.put('/:id', (req, res) => {
    const { name, age } = req.query;
    const user = users.find(u => u.id === req.params.id);

    if (!user) {
        return res.status(404).send("User not found");
    }

    if (name) user.name = name;
    if (age) user.age = age;

    res.send(`User ${user.id} updated successfully!`);
});

// ✅ DELETE /users/:id (Delete a user)
usersRouter.delete('/:id', (req, res) => {
    const index = users.findIndex(u => u.id === req.params.id);
    
    if (index === -1) {
        return res.status(404).send("User not found");
    }

    users.splice(index, 1);
    res.status(204).send();
});

// Export the router
module.exports = usersRouter;
