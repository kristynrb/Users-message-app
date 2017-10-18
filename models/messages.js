const mongoose = require('mongoose');

const messageSchema = mongoose.Schema ({
    message: {type: String, required: true},
    status: { type: String, required: true },
    author_id: {type: String: required: true},
    organization: {type: String}
  });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
