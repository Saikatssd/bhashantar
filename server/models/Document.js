const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    sl_no: { type: Number, required: true },
    fileName: { type: String, required: true },
    pageCount: { type: Number, required: true },
    dateCreated: { type: Date, default: Date.now },
    status: { type: String, enum: ['ready', 'in-progress', 'completed'], default: 'ready' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    originalContent: { type: String, required: true },
    translatedContent: { type: String, required: true },
    dateCompleted: { type: Date }
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
