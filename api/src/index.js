const express = require('express');

const userRoutes = require('./routes/users-routes');
const carRoutes = require('./routes/cars-route');
const dealerRoutes = require('./routes/dealers-route');

const app = express();
app.use(express.json());

const PORT = +process.env.PORT || 3000;

// Routes
app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/dealers', dealerRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
