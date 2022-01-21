const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    pseudo: { type: String, required: true, unique: true },
    name: { type: String, required: false, unique: false },
    firstname: { type: String, required: false, unique: false },
    email: { type: String, require: true, unique: true },
    password: { type: String, required: true },
    role: { type: Array, required: true },
});

module.exports = mongoose.model('user', userSchema);
