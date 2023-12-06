const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true,unique: false },
  password: { type: String, required: true,unique: false },
  email: { type: String, required: true }
}, {
  timestamps: true
});

const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;