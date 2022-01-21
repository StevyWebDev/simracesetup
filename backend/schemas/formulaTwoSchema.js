const mongoose = require('mongoose');

const formulaTwoSchema = mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
});

module.exports = mongoose.model('formulaTwo', formulaTwoSchema);
