const express = require('express');
require('dotenv').config();

//!Connect Morgan

const morgan = require('morgan');

//! Connect to the database
const connectDB = require('./config/db');
connectDB();
const app = express();



//!initializing middleware
app.use(express.json());
app.use(express.json({ extend: true }));

//!Get the data send to the server with json format object
app.get('/', (req, res) => {
  res.send('This is what I sent');
});

//! Define the routes
app.use('/api/users', require('./routes/userR'));

app.use('/api/contacts', require('./routes/contactsR'));
app.use('/api/auth', require('./routes/authR'));

app.use(morgan('combined'));

// const PORT = process.env.PORT || 8080

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
