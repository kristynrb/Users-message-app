const mongoose = require('mongoose'),
      User = require('./users.js');

const messageSchema = mongoose.Schema ({
    message: {type: String, required: true},
    status: String
  });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
