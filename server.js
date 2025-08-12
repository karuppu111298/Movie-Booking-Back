const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db.js');
const app = express();
const config = require('./config/config');
const authRoutes = require('./routes/auth_routes');
const userRoutes = require('./routes/user_routes');
const postRoutes = require('./routes/post_routes');
const movieRoutes = require('./routes/movie_routes');
const screenRoutes = require('./routes/screen_routes');
const movieAssignRoutes = require('./routes/movie_assign_routes');

const cors = require('cors');
require('dotenv').config();


const PORT = config.port || 5000;
app.use(bodyParser.json());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));


app.use('/uploads', express.static('uploads'));

app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', postRoutes);
app.use('/api', movieRoutes);
app.use('/api', screenRoutes);
app.use('/api', movieAssignRoutes);

app.listen(PORT, () => {
  console.log('Express server is running successfully', PORT);
})

