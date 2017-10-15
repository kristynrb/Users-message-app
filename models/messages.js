const mongoose = require('mongoose');

const messageSchema = mongoose.Schema ({
    message: {type: String, required: true},
    status: String,
    author: [userSchema]
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
