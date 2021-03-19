const carModel = require('../models/cars-model');

exports.createCar = (req, res) => {
	const { userId } = req.userData;

	if (!userId) {
		return res.status(401).json({ message: 'Auth invalid' });
	}

	res.status(200).json();

	// const { firstName, lastName, email, age, password } = req.body;

	// if (!firstName || !lastName || !email || !password) {
	// 	return res.status(400).json({
	// 		message:
	// 			'All the fields [firstName, lastName, email, password] are required',
	// 	});
	// }

	// carModel
	// 			.createUser(newUser)
	// 			.then((resp) => res.status(200).json(resp))
	// 			.catch((err) =>
	// 				res.status(400).json({
	// 					message: 'Cannot create user',
	// 					error: err,
	// 				})
	// 			);
};

exports.getCars = (req, res) => {
	carModel
		.getAllCars()
		.then((cars) => res.status(200).json(cars))
		.catch((err) => {
			res.status(400).json({ error: err });
			throw err;
		});
};

exports.getCarBrands = async (req, res) => {
	try {
		let brands = await carModel.getCarBrands();

		if (brands && brands.length > 0) {
			brands = await Promise.all(
				brands.map(async (brand) => {
					const models = await carModel.getCarModelsByBrandId(brand.id);

					return {
						...brand,
						models,
					};
				})
			);

			return res.status(200).json(brands);
		} else {
			return res.status(204);
		}
	} catch (error) {
		res.status(400).json({
			error: 'Invalid request',
		});
		throw error;
	}
};

// exports.getCarModelsByBrandId = (req, res) => {};
// exports.getCarModels = (req, res) => {};

exports.getById = (req, res) => {
	const id = req.params.id;

	// userModel
	// 	.getUserById(id)
	// 	.then((user) => {
	// 		if (!user) {
	// 			return res.status(404).json({
	// 				message: `No user with id ${id}`,
	// 			});
	// 		}
	// 		const { password, ...userWithoutPassword } = user;
	// 		return res.status(200).json(userWithoutPassword);
	// 	})
	// 	.catch((err) =>
	// 		res.status(400).json({
	// 			message: 'Invalid request',
	// 			error: err,
	// 		})
	// 	);
};

exports.updateCar = (req, res) => {
	const { userId } = req.userData;

	if (!userId) {
		return res.status(401).json({ message: 'Auth invalid' });
	}

	const id = req.params.id;

	// const user = {
	// 	firstName: req.body.firstName,
	// 	lastName: req.body.lastName,
	// 	age: req.body.age,
	// };

	// userModel
	// 	.updateUser(id, user)
	// 	.then((resp) => {
	// 		if (resp.affectedRows > 0)
	// 			return res.status(200).json({
	// 				message: 'User Updated',
	// 			});
	// 		else
	// 			return res.status(404).json({
	// 				message: 'User Not Found',
	// 			});
	// 	})
	// 	.catch((err) =>
	// 		res.status(400).json({
	// 			message: 'Invalid request',
	// 			error: err,
	// 		})
	// 	);
};

exports.deleteCar = (req, res) => {
	const { userId } = req.userData;

	if (!userId) {
		return res.status(401).json({ message: 'Auth invalid' });
	}

	// const id = req.params.id;

	// userModel
	// 	.deleteUser(id)
	// 	.then((resp) => {
	// 		console.log(resp);
	// 		if (resp.affectedRows > 0) {
	// 			return res.status(204).json();
	// 		}

	// 		return res.status(404).json({
	// 			message: `No user with id ${id}`,
	// 		});
	// 	})
	// 	.catch((err) =>
	// 		res.status(400).json({
	// 			message: 'Invalid request',
	// 			error: err,
	// 		})
	// 	);
};
