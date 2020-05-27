const mongoose = require('mongoose');
const schema = mongoose.Schema;

/**
 * @swagger
 *  components:
 *    schemas:
 *      Auth:
 *        type: object
 *        required:
 *          - password
 *          - email
 *        properties:
 *          password:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, needs to be unique.
 *        example:
 *           password: Testing
 *           email: fake@email.com
 */

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