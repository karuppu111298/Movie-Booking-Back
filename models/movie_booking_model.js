const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  movie_assign_id: { type: mongoose.Schema.Types.ObjectId, ref: 'MovieAssign', required: true },
  seat_number: [],
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("MovieBooking", bookingSchema);
