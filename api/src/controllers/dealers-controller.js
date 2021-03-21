const dealerModel = require('../models/dealers-model');
const carModel = require('../models/cars-model');

exports.createDealer = async (req, res) => {
	const { isAdmin } = req.userData;

	if (!isAdmin) {
		return res.status(401).json({ message: 'Auth invalid' });
	}

	const newDealer = {
		name: req.body.name,
		userId: req.body.userId,
	};

	if (!newDealer.name || !newDealer.userId) {
		return res.status(400).json({ message: 'Name and UserId are required' });
	}

	const userHasDealer = await dealerModel.getDealerByUserId(newDealer.userId);

	if (userHasDealer) {
		return res
			.status(400)
			.json({ message: 'User already is registered in a dealer' });
	}

	const nameExists = await dealerModel.getDealerByName(newDealer.name);

	if (nameExists) {
		return res.status(400).json({ message: 'Name is already taken' });
	}

	dealerModel
		.createDealer(newDealer)
		.then((resp) => {
			if (resp.affectedRows > 0) {
				return res.status(201).json(resp);
			}
		})
		.catch((error) => res.status(400).json({ message: error }));
};

exports.getDealers = (req, res) => {
	dealerModel
		.getAll()
		.then((dealers) => res.status(200).json(dealers))
		.catch((error) => res.status(400).json({ message: error }));
};

exports.getDealerByUserId = (req, res) => {
	const { userId } = req.userData;

	if (!userId) {
		return res.status(401).json({ message: 'Auth failed' });
	}

	dealerModel
		.getDealerByUserId(userId)
		.then((dealer) => res.status(200).json(dealer))
		.catch((error) => res.status(400).json({ message: error }));
};

exports.getDealerById = (req, res) => {
	const { userId, isAdmin } = req.userData;
	const id = req.params.id;

	dealerModel
		.getDealerById(id)
		.then((dealer) => {
			if (!dealer) {
				return res.status(404).json({ message: 'Dealer not found' });
			}

			const { dealerStatus, ...dealerDto } = dealer;

			if (!isAdmin && dealerUserId != userId) {
				return res.status(401).json({ message: 'Auth Failed' });
			}

			return res.status(200).json(dealerDto);
		})
		.catch((error) => res.status(400).json({ message: error }));
};

// Get dealer stock (cars available)
exports.getDealerStock = async (req, res) => {
	try {
		const id = req.params.id;
		if (!id) {
			return res.status(400).json({ message: 'Invalid request' });
		}

		const dealer = await dealerModel.getDealerById(id);

		if (!dealer) {
			return res.status(404).json({ message: 'Dealer not found' });
		}

		let stock = await carModel.getCarsByDealerId(dealer.id);

		stock = stock.map((car) => {
			return {
				id: car.id,
				brand: car.brand,
				model: car.model,
				color: car.color,
				year: car.year,
			};
		});

		const dealerStock = {
			...dealer,
			stock,
		};

		return res.status(200).json(dealerStock);
	} catch (error) {
		res.status(400).json({ message: 'Invalid Request', error: error });
		throw error;
	}
};

// Update dealer
exports.updateDealer = async (req, res) => {
	const { userId } = req.userData;

	if (!userId) {
		return res.status(401).json({ message: 'Auth failed' });
	}

	try {
		const id = req.params.id;

		const dealerFromDb = await dealerModel.getDealerById(id);

		if (!dealerFromDb) {
			return res.status(404).json({ message: 'Dealer not found' });
		}

		if (dealerFromDb.userId !== userId) {
			return res.status(401).json({ message: 'Auth failed' });
		}

		const dealer = {
			name: req.body.name,
		};

		dealerModel
			.updateDealer(id, dealer)
			.then((resp) => res.status(200).json(resp))
			.catch((err) =>
				res.status(400).json({ message: 'Invalid request', error: err })
			);
	} catch (error) {
		return res.status(400).json({
			message: 'Invalid request',
			error: err,
		});
	}
};

// Delete dealer
exports.deleteDealer = async (req, res) => {
	const { isAdmin } = req.userData;

	if (!isAdmin) {
		return res.status(401).json({ message: 'Auth failed' });
	}

	try {
		const id = req.params.id;

		const dealerFromDb = await dealerModel.getDealerById(id);

		if (!dealerFromDb) {
			return res.status(404).json({ message: 'Dealer not found' });
		}

		dealerModel
			.deleteDealer(id)
			.then((resp) => res.status(204).json(resp))
			.catch((err) =>
				res.status(400).json({ message: 'Invalid request', error: err })
			);
	} catch (error) {
		return res.status(400).json({
			message: 'Invalid request',
			error: err,
		});
	}
};
