const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth.middleware');
const controller = require('../controllers/client.controller');

router.use(protect);
router.get('/', controller.getClients);
router.post('/', controller.createClient);
router.put('/:id', controller.updateClient);
router.delete('/:id', controller.deleteClient);

module.exports = router;
