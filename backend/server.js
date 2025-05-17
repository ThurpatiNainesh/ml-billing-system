const express = require('express');
const connectDB = require('./config/db');
const projectsRouter = require('./routes/projects');
require('dotenv').config();
const cors = require("cors")
const app = express();
app.use(cors())
app.use(express.json());
connectDB();
app.use('/api/projects', projectsRouter);
app.use(require('./middleware/errorHandler'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));