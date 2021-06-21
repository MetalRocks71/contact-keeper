const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

//!Get the data send to the server with json format object
app.get('/', (req, res) => {
    res.json(({msg:'This is what I sent'}));
});

//! Define the routes
app.use('/api/users', require('./routes/userR'))
app.use('/api/contacts', require('./routes/contactsR'))
app.use('/api/auth', require('./routes/authR'))


//! Connect to the database
const PORT = process.env.PORT || 5000;
const DB_uri = process.env.DB_CONNECTIONS;
mongoose
  .connect(DB_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => app.listen(PORT))
  .catch((err) => console.log(err));
