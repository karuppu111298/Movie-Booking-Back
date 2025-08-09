const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db.js');
const app = express();
const config = require('./config/config');
const authRoutes = require('./routes/auth_routes');
const userRoutes = require('./routes/user_routes');
const postRoutes = require('./routes/post_routes');

const cors = require('cors');


const PORT = config.port || 5000;
app.use(bodyParser.json());
// app.use(cors({
//   origin: "http://localhost:8081",
//   credentials: true
// }));
app.use(cors());

app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', postRoutes);

app.listen(PORT, () => {
  console.log('Express server is running successfully', PORT);
})

