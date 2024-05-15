const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const PostSchema = new mongoose.Schema({
  username: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  date: { type: Date, required: true },
  draft: { type: Boolean, required: true },
});

PostSchema.virtual('date_formatted').get(function () {
  return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
})

module.exports = mongoose.model('Post', PostSchema);
