const mongoose = require("mongoose");

const screenSchema = new mongoose.Schema({
    screen_name: { type: String, required: true, unique: true },
    seat_qty: { type: Number, required: true },
    seat_number: {
        left: [ { id: Number, name: String, } ],
        center: [ { id: Number, name: String, } ],
        right: [ { id: Number, name: String, } ]
    },
    createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model("Screen", screenSchema);
