const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ReceiptSchema = new Schema({
  id: {
    type: String,
  },
  userId: {
    type: String,
  },
  imageId: {
    type: String,
  },
  text: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  fileUrl: {
    type: String,
  },
  created: {
    type: String,
  },
});

module.exports = mongoose.model('Receipt', ReceiptSchema);