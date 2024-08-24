const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    floor: {
        type: String,
        required: true
    },
    portion: {
        type: String,
        required: true
    }
});

const customer = mongoose.model('customer', customerSchema);

module.exports = customer;
