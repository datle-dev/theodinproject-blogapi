const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  username: { type: String, required: true },
});

module.exports = mongoose.model('Author', AuthorSchema);
