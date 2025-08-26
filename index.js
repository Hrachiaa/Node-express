require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/userRoutes.js');
const questionRoutes = require('./routes/questionRoutes.js');
const errorMiddleware = require('./middlewares/error.js');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use('/', userRoutes);
app.use('/', questionRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Server is working on PORT ${PORT}`));
