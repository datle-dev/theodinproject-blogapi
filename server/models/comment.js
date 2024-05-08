const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model('Comment', CommentSchema);
