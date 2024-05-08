const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  username: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  date: { type: Date, required: true },
  draft: { type: Boolean, required: true },
});

module.exports = mongoose.model('Post', PostSchema);
