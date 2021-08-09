const mongoose = require('mongoose');
require('dotenv').config();
const db = process.env.DB_LINK;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log('Connected to database....');
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
