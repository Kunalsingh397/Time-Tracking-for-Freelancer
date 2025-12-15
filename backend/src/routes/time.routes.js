const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth.middleware');
const controller = require('../controllers/time.controller');

router.use(protect);
router.get('/', controller.getTimeLogs);
router.post('/', controller.createTimeLog);
router.put('/:id', controller.updateTimeLog);
router.delete('/:id', controller.deleteTimeLog);

module.exports = router;
