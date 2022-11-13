const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },
});

module.exports = model('User', userSchema);
