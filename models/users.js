const mongoose = require('mongoose');
      Message = require('./messages.js');

const userSchema = mongoose.Schema ({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    organization: {type: String, required: true},
    messages: [Message.schema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
