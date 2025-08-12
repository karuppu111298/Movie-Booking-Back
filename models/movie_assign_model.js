const mongoose = require("mongoose");

const movieAssignSchema = new mongoose.Schema({
  movie_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  seat_screen_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Screen', required: true },
  show_time: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("MovieAssign", movieAssignSchema);
