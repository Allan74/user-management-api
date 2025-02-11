const express = require('express');
const app = express();
const usersRouter = require('./users'); // ✅ Ensure you're requiring the correct file

app.use('/users', usersRouter); // ✅ Mount the router at /users

app.listen(3000, () => console.log('🚀 Server running on port 3000'));

