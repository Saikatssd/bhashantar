const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
    role_name: { type: String, required: true, unique: true },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }],
    // isActive: { type: Boolean, default: true },
    // isDeleted: { type: Boolean, default: false },
    create_ts: { type: Date, default: Date.now },
    updated_ts: { type: Date, default: Date.now },
    isAllowedToDelete: { type: Boolean, default: false },
    isDefault: { type: Boolean, default: false } // Indicates if it's a default role like 'admin' or 'user'
});

module.exports = mongoose.model('Role', roleSchema);
