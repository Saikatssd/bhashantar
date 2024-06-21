const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
    link: { type: String },
    view: { type: Boolean, default: false },
    add: { type: Boolean, default: false },
    edit: { type: Boolean, default: false },
    delete: { type: Boolean, default: false },
    upload: { type: Boolean, default: false },
    download: { type: Boolean, default: false },
});s

const permissionModel = mongoose.model("role", permissionSchema);

module.exports = permissionModel;