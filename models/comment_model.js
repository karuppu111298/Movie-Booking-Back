// models/Comment.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text:  { type: String, required: true },
  post_id:  { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
