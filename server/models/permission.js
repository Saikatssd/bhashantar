const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
    links: [{ type: String }],
    view: { type: Boolean, default: false },
    add: { type: Boolean, default: false },
    edit: { type: Boolean, default: false },
    delete: { type: Boolean, default: false },
    upload: { type: Boolean, default: false },
    download: { type: Boolean, default: false },
});

module.exports = mongoose.model("Permission", permissionSchema);
