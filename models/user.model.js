const mongoose = require('mongoose');
const schema = mongoose.Schema;

const user = new schema({
    username: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    createdDate: {
        type: Date, 
        required: true, 
        default: Date.now
    }
});

module.exports = mongoose.model('User', user);