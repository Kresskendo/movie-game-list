const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, enum: ['movie', 'game'], required: true },
});

module.exports = mongoose.model('Item', itemSchema);