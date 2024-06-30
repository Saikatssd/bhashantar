// const mongoose = require('mongoose');

// const documentSchema = new mongoose.Schema({
//     // sl_no: { type: Number, required: true },
//     // fileName: { type: String, required: true },
//     // pageCount: { type: Number, required: true },
//     // dateCreated: { type: Date, default: Date.now },
//     // status: { type: String, enum: ['ready', 'in-progress', 'completed'], default: 'ready' },
//     // assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
//     // originalContent: { type: String, required: true },
//     // translatedContent: { type: String, required: true },
//     // dateCompleted: { type: Date }
//     _id: String,
//     data: Object,
//     // project_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
//     // // sl_no: { type: Number, required: true },
//     // file_name: { type: String, required: true },
//     // page_count: { type: Number, required: true },
//     // date_created: { type: Date, default: Date.now },
//     // status: { type: String, enum: ['ready-for-work', 'work-in-progress', 'completed'], default: 'ready-for-work' },
//     // assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
//     // original_content: { type: String},
//     // translated_content: { type: String },
//     // date_completed: { type: Date }
// });

// const Document = mongoose.model('Document', documentSchema);

// module.exports = Document;



const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    project_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    // sl_no: { type: Number, required: true },
    file_name: { type: String, required: true },
    page_count: { type: Number, required: true },
    date_created: { type: Date, default: Date.now },
    status: { type: String, enum: ['ready-for-work', 'work-in-progress', 'completed'], default: 'ready-for-work' },
    assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    original_content: { type: String},
    translated_content: { type: String },
    date_completed: { type: Date },
    _id: String,
    data: Object,
});

module.exports = mongoose.model('Document', documentSchema);


