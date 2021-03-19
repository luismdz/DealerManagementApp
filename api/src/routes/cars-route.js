const express = require('express');
const router = express.Router();
const CarsController = require('../controllers/cars-controller');
const checkAuth = require('../middlewares/check-auth');

router.get('/', CarsController.getCars);
router.get('/brands', CarsController.getCarBrands);
// router.get('/', CarsController.getCarModelsByBrandId);
// router.get('/', CarsController.getCarModels);
router.post('/', checkAuth, CarsController.createCar);
router.get('/:id', CarsController.getById);
router.put('/:id', checkAuth, CarsController.updateCar);
router.delete('/:id', checkAuth, CarsController.deleteCar);

module.exports = router;
