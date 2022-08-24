const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ROLE = {
  ADMIN: 'admin',
  BASIC: 'basic'
}

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 1, },
  registrationDate: { type: Date, default: Date.now },
  role: { type: String, default: ROLE.BASIC, required: true },
  permissions: { type: Array },
}, { versionKey: false });

const User = mongoose.model('User', userSchema);

module.exports = User;