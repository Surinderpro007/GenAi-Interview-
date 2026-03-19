const monoose = require('mongoose');

const userSchema = new monoose.Schema({
    username: { 
        type: String, 
        unique: [true, 'Username is already taken'], 
        required: true,
    },
    email: { 
        type: String,
        required: [true, 'Account using this email is already exists'], 
        unique: true 
    },
    password: {
         type: String, 
         required: true 
        },
});

const userModel = monoose.model('User', userSchema);
module.exports = userModel;