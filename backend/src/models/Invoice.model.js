const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  timeLogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TimeLog' }],
  issueDate: { type: Date, default: Date.now },
  dueDate: { type: Date },
  hourlyRate: { type: Number, default: 0 },
  totalHours: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 },
  status: { type: String, enum: ['draft', 'sent', 'paid'], default: 'draft' },
}, { timestamps: true });

module.exports = mongoose.model('Invoice', InvoiceSchema);
