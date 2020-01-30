const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});

ClientSchema.index({ id: 1 });

module.exports = mongoose.model('Client', ClientSchema);
