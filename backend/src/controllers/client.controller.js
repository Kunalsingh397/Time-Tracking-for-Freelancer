const Client = require('../models/Client.model');

exports.createClient = async (req, res) => {
  try {
    const client = await Client.create({ ...req.body, user: req.user._id });
    res.json(client);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find({ user: req.user._id });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true });
    res.json(client);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    await Client.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
