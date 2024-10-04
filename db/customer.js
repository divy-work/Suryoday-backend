const mongoose = require('mongoose');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

// Extend dayjs with the required plugins
dayjs.extend(utc);
dayjs.extend(timezone);

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
    },
     // Add the dateAdded field to store IST time
     dateAdded: {
        type: String,
        default: () => dayjs().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss') // IST date-time
    }
});

const customer = mongoose.model('customer', customerSchema);

module.exports = customer;
