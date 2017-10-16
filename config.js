'use strict';
const db = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/omni_lab_interview_app'

module.exports = {
  db: {
    production: db,
    development: db,
    test: db,
  },
  mailer: {
    auth: {
      user: 'test@example.com',
      pass: 'secret',
    },
    defaultFromAddress: 'First Last <test@example.com>'
  }
};
