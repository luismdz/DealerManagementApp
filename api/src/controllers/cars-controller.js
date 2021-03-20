const carsModel = require('../models/cars-model');

exports.createCar = (req, res) => {
	const { userId } = req.userData;

	if (!userId) {
		return res.status(401).json({ message: 'Auth invalid' });
	}

	const { year, carModelId, color, dealerId } = req.body;

	if ((!year || !carModelId, !color)) {
		return res
			.status(400)
			.json({ message: 'All fields [year, carModelId, color] are required' });
	}

	const newCar = {
		year,
		carModelId,
		color,
		dealerId,
		createdById: userId,
	};

	carsModel
		.createCar(newCar)
		.then((resp) => res.status(200).json(resp))
		.catch((error) => res.status(400).json(error));
};

exports.getCars = (req, res) => {
	carsModel
		.getAllCars()
		.then((cars) => res.status(200).json(cars))
		.catch((err) => {
			res.status(400).json({ error: err });
			throw err;
		});
};

exports.getCarBrands = async (req, res) => {
	try {
		let brands = await carsModel.getCarBrands();

		if (brands && brands.length > 0) {
			// brands = await Promise.all(
			// 	brands.map(async (brand) => {
			// 		const models = await carsModel.getCarModelsByBrandId(brand.id);
			// 		return {
			// 			...brand,
			// 			models,
			// 		};
			// 	})
			// );
		}

		return res.status(200).json(brands);
	} catch (error) {
		res.status(400).json({
			error: 'Invalid request',
		});
		throw error;
	}
};

exports.getCarModelsByBrandId = (req, res) => {
	const id = req.query.brandId;

	if (!id) {
		return res.status(400).json({ message: 'Param BrandId is required' });
	}

	carsModel
		.getCarModelsByBrandId(id)
		.then((models) => res.status(200).json(models))
		.catch((error) =>
			res.status(400).json({ message: 'Invalid request', error: error })
		);
};

// exports.getCarModels = (req, res) => {};

exports.getById = (req, res) => {
	const id = req.params.id;

	carsModel
		.getCarById(id)
		.then((car) => {
			if (!car) {
				return res.status(404).json({ message: 'Car Not Found' });
			}

			return res.status(200).json(car);
		})
		.catch((error) => res.status(400).json({ message: 'Invalid request' }));
};

exports.updateCar = async (req, res) => {
	const { userId } = req.userData;

	if (!userId) {
		return res.status(401).json({ message: 'Auth invalid' });
	}

	try {
		const id = req.params.id;

		const carFromDb = await carsModel.getCarById(id);

		if (!carFromDb) {
			return res.status(404).json({ message: 'Car not found' });
		}

		if (carFromDb.createdById !== userId) {
			return res.status(401).json({ message: 'Auth invalid' });
		}

		const car = {
			year: req.body.year,
			color: req.body.color,
			carModelId: req.body.carModelId,
		};

		carsModel
			.updateCar(id, car)
			.then((resp) => res.status(200).json(resp))
			.catch((error) =>
				res.status(400).json({ message: 'Invalid request', error })
			);
	} catch (error) {
		return res.status(400).json({ message: 'Invalid request' });
	}
};

exports.deleteCar = async (req, res) => {
	const { userId } = req.userData;

	if (!userId) {
		return res.status(401).json({ message: 'Auth invalid' });
	}

	try {
		const id = req.params.id;

		const carFromDb = await carsModel.getCarById(id);

		if (!carFromDb) {
			return res.status(404).json({ message: 'Car not found' });
		}

		if (carFromDb.createdById !== userId) {
			return res.status(401).json({ message: 'Auth invalid' });
		}

		carsModel
			.deleteCar(id)
			.then((resp) => res.status(200).json(resp))
			.catch((error) =>
				res.status(400).json({ message: 'Invalid request', error })
			);
	} catch (error) {
		return res.status(400).json({ message: 'Invalid request' });
	}
};
