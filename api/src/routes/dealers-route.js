const express = require('express');
const router = express.Router();
const DealersController = require('../controllers/dealers-controller');
const checkAuth = require('../middlewares/check-auth');

router.get('/', DealersController.getDealers);
router.get('/stock/:id', DealersController.getDealerStock);
router.get('/:id', DealersController.getDealerById);
router.get('/user', checkAuth, DealersController.getDealerByUserId);
router.post('/', checkAuth, DealersController.createDealer);
router.put('/:id', checkAuth, DealersController.updateDealer);
router.delete('/:id', checkAuth, DealersController.deleteDealer);

module.exports = router;
