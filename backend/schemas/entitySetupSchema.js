const mongoose = require('mongoose');

const entitySetupSchema = mongoose.Schema({
    name: { type: String, require: true, unique: true },
    min: { type: Number },
    max: { type: Number },
    inteval: { type: Number },
    textList: { type: [String] },
});

module.exports = mongoose.model('entitySetup', entitySetupSchema);
