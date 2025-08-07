const mongoose = require('mongoose');

const savedSymbolSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    symbol: { type: String, ref: 'Stock', required: true },
    alias: { type: String }
}, { timestamps:true });

module.exports = mongoose.model('SavedSymbol', savedSymbolSchema);