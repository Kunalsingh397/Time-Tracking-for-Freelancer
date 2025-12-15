const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth.middleware');
const controller = require('../controllers/project.controller');

router.use(protect);
router.get('/', controller.getProjects);
router.post('/', controller.createProject);
router.put('/:id', controller.updateProject);
router.delete('/:id', controller.deleteProject);

module.exports = router;
