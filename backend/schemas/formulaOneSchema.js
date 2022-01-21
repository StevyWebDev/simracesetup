const mongoose = require('mongoose');

const formulaOneSchema = mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
});

module.exports = mongoose.model('formulaOne', formulaOneSchema);
