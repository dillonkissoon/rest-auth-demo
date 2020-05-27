const mongoose = require('mongoose');
const schema = mongoose.Schema;

const refreshToken = new schema({
    username: { 
        type: String, 
        required: true 
    },
    token:  {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('RefreshToken', refreshToken);