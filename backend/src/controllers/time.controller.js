const TimeLog = require('../models/TimeLog.model');
const Project = require('../models/Project.model');

exports.createTimeLog = async (req, res) => {
  try {
    const { project, date, startTime, endTime, notes } = req.body;
    let durationHours = 0;
    if (startTime && endTime) {
      durationHours = (new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60);
    }
    const tl = await TimeLog.create({ user: req.user._id, project, date, startTime, endTime, durationHours, notes });
    res.json(tl);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTimeLogs = async (req, res) => {
  try {
    const logs = await TimeLog.find({ user: req.user._id }).populate('project');
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTimeLog = async (req, res) => {
  try {
    const body = req.body;
    if (body.startTime && body.endTime) {
      body.durationHours = (new Date(body.endTime) - new Date(body.startTime)) / (1000 * 60 * 60);
    }
    const updated = await TimeLog.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteTimeLog = async (req, res) => {
  try {
    await TimeLog.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
