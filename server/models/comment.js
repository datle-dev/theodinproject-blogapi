const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const CommentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, required: true },
  postId: { type: mongoose.Types.ObjectId, required: true },
}, { toJSON: { virtuals: true } });

CommentSchema.virtual('date_formatted').get(function () {
  return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
})

module.exports = mongoose.model('Comment', CommentSchema);
