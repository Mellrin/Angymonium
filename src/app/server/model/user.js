const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6, },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  },
  registrationDate: { type: Date, default: Date.now },
  permissions: { type: Array },
}, { versionKey: false });

const User = mongoose.model('User', userSchema);

module.exports = User;