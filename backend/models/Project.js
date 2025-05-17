const mongoose = require('mongoose');
const ProjectSchema = new mongoose.Schema({
    poNumber: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    type: { type: String, enum: ['Mockups', 'Proposals', 'Presentations', 'Credentials', 'RFP'], required: true },
    category: { type: String, enum: ['Simple', 'Medium', 'Complex'], required: true },
    clientName: { type: String, required: true },
    designation: { type: String, required: true },
    dateDelivered: { type: Date, required: true },
    status: { type: String, enum: ['ongoing', 'completed', 'pending'], default: 'completed' },
    cost: { type: Number },
    notes: { type: String }
}, { timestamps: true });
module.exports = mongoose.model('Project', ProjectSchema);