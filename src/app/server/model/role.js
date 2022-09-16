const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ROLE = {
  ADMIN: 'admin',
  BASIC: 'basic'
}

const roleSchema = new Schema({
  title: {
    type: String,
    required: true,
    enum: Object.values(ROLE)
  }
}, { versionKey: false });

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;