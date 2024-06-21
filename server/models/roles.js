const mongoose = require('mongoose');


const roleSchema = new mongoose.Schema({
    role_name: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    create_ts: { type: Date, default: Date.now },
    updated_ts: { type: Date, default: Date.now },
    isAllowedToDelete: { type: Boolean, default: false },

});


const roleModel = mongoose.model("role", roleSchema);

module.exports = roleModel;
