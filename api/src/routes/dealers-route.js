const express = require('express');
const router = express.Router();
const DealersController = require('../controllers/dealers-controller');
const checkAuth = require('../middlewares/check-auth');

router.get('/', DealersController.getDealers);
router.post('/', checkAuth, DealersController.createDealer);
router.get('/:id', DealersController.getById);
router.put('/:id', checkAuth, DealersController.updateDealer);
router.delete('/:id', checkAuth, DealersController.deleteDealer);

module.exports = router;
