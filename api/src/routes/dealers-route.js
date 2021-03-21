const express = require('express');
const router = express.Router();
const DealersController = require('../controllers/dealers-controller');
const checkAuth = require('../middlewares/check-auth');

router.get('/', checkAuth, DealersController.getDealers);
router.get('/user', checkAuth, DealersController.getDealerByUserId);
router.get('/stock/:id', checkAuth, DealersController.getDealerStock);
router.get('/:id', checkAuth, DealersController.getDealerById);
router.post('/', checkAuth, DealersController.createDealer);
router.put('/:id', checkAuth, DealersController.updateDealer);
router.delete('/:id', checkAuth, DealersController.deleteDealer);

module.exports = router;
