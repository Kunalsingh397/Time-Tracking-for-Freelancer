const Invoice = require('../models/Invoice.model');
const TimeLog = require('../models/TimeLog.model');
const PDFGenerator = require('../utils/generateInvoice');

exports.createInvoice = async (req, res) => {
  try {
    const { client, project, timeLogs = [], dueDate, hourlyRate } = req.body;
    const logs = await TimeLog.find({ _id: { $in: timeLogs }, user: req.user._id });
    const totalHours = logs.reduce((s, l) => s + (l.durationHours || 0), 0);
    const totalAmount = totalHours * (hourlyRate || 0);
    const inv = await Invoice.create({ user: req.user._id, client, project, timeLogs, dueDate, hourlyRate, totalHours, totalAmount });
    res.json(inv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ user: req.user._id }).populate('client').populate('project').populate('timeLogs');
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getInvoicePdf = async (req, res) => {
  try {
    const invoice = await Invoice.findOne({ _id: req.params.id, user: req.user._id }).populate('client').populate('project').populate('timeLogs');
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
    const pdfBuffer = await PDFGenerator(invoice);
    res.set({ 'Content-Type': 'application/pdf', 'Content-Disposition': `attachment; filename=invoice-${invoice._id}.pdf` });
    res.send(pdfBuffer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateInvoice = async (req, res) => {
  try {
    const inv = await Invoice.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true });
    res.json(inv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteInvoice = async (req, res) => {
  try {
    await Invoice.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
