const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
    role_name: { type: String, required: true, unique: true },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }],
    isActive: { type: Boolean, default: true },
    create_ts: { type: Date, default: Date.now },
    updated_ts: { type: Date, default: Date.now },
    isAllowedToDelete: { type: Boolean, default: true },
    // isDefault: { type: Boolean, default: false } 
});

module.exports = mongoose.model('Role', roleSchema);
