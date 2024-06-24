const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  admin: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Company', CompanySchema);
