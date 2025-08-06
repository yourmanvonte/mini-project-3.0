const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    symbol: {type: String, required: true, unique: true},
    name: String,
    price: Number,
    date: Date
});

module.exports = mongoose.model('Stock', stockSchema);