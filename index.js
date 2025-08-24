const express = require('express');
const userRoutes = require('./routes/userRoutes.js');
const questionRoutes = require('./routes/questionRoutes.js');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/', userRoutes);
app.use('/', questionRoutes);

app.listen(PORT, () => console.log(`Server is working on PORT ${PORT}`));
