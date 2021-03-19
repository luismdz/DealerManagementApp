const express = require('express');
const db = require('./db/db-connection');
// const userModel = require('./models/users-model');
const userRoutes = require('./routes/users-routes');

const app = express();

const PORT = +process.env.PORT || 3000;

app.use(express.json());

// Users endpoints
app.use('/api/users', userRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
