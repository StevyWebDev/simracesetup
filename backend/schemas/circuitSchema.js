const mongoose = require('mongoose');

const circuitSchema = mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    nation: { type: String, required: true },
});

module.exports = mongoose.model('circuit', circuitSchema);
