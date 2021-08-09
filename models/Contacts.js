const mongoose = require('mongoose');

//!create a relationship between two models user and contact (everything logged user has its unique list to contact9
//! the document has a unique type and it is the ObjectId
//! we need to refered to specific collection in mongoose as ref:''
const ContactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
  },

  type: {
    type: String,
    default: 'personal',
  },
  date: {
    type: Date,
    require: true,
    default: Date.now(),
  },
});
module.exports = mongoose.model('contact', ContactSchema);
