const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
});

module.exports = mongoose.model('User', UserSchema);