const mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    amountInsured: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    inceptionDate: {
        type: Date,
        required: true
    },
    installmentPayment: {
        type: Boolean,
        required: true,
        default: false
    },
    clientId: { type: String, required: true }
});

PolicySchema.index({ id: 1 });

PolicySchema.set('toObject', { virtuals: true });
PolicySchema.set('toJSON', { virtuals: true });

PolicySchema.virtual('client', {
    required: true,
    type: String,
    ref: 'Client',
    localField: 'clientId',
    foreignField: 'id',
    justOne: true
});

module.exports = mongoose.model('Policy', PolicySchema);
