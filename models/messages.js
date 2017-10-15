const mongoose = require('mongoose');

const messageSchema = mongoose.Schema ({
    message: {type: String, required: true},
    status: { type: String },
    author_id: {type: String}
  });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
