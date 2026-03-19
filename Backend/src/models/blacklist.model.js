const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const tokenBlackList = mongoose.model('BlacklistToken', blacklistSchema);
module.exports = tokenBlackList;