const mongoose = require('mongoose');

const saisonSchema = mongoose.Schema({
    year: { type: Number, required: true, unique: true },
    image: { type: String, required: true },
    formulaOneTeams: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'formulaOne',
            required: false,
        },
    ],
    formulaTwoTeams: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'formulaTwo',
            required: false,
        },
    ],
    circuits: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'circuit',
            required: false,
        },
    ],
    entitySetups: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'entitySetup',
            required: true,
        },
    ],

    setups: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'setup',
            required: false,
        },
    ],
});

module.exports = mongoose.model('saison', saisonSchema);
