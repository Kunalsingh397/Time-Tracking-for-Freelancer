const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth.middleware');
const controller = require('../controllers/invoice.controller');

router.use(protect);
router.get('/', controller.getInvoices);
router.post('/', controller.createInvoice);
router.get('/:id/pdf', controller.getInvoicePdf);
router.put('/:id', controller.updateInvoice);
router.delete('/:id', controller.deleteInvoice);

module.exports = router;
