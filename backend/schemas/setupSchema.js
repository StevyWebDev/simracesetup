const mongoose = require('mongoose');

const setupSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    circuit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'circuit',
        required: true,
    },
    formulaOne: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'formulaOne',
    },
    formulaTwo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'formulaTwo',
    },
    data: { type: Object, required: true },
});

module.exports = mongoose.model('setup', setupSchema);
