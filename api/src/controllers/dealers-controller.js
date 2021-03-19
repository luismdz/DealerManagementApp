const dealersModel = require('../models/dealers-model');
const dealerModel = require('../models/dealers-model');

exports.createDealer = async (req, res) => {
	const { userId } = req.userData;

	if (!userId) {
		return res.status(401).json({ message: 'Auth invalid' });
	}

	const newDealer = {
		name: req.body.name,
		userId: userId,
	};

	if (!newDealer.name) {
		return res.status(400).json({ message: 'Name is required' });
	}

	const userHasDealer = await dealerModel.getDealerByUserId(userId);

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

exports.getDealersByUserId = (req, res) => {
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
	// const { userId } = req.userData;

	// if (!userId) {
	// 	return res.status(401).json({ message: 'Auth failed' });
	// }
	const id = req.params.id;

	dealerModel
		.getDealerById(id)
		.then((dealer) => {
			const { dealerUserId, dealerStatus, ...dealerDto } = dealer;

			return res.status(200).json(dealerDto);
		})
		.catch((error) => res.status(400).json({ message: error }));
};

exports.updateDealer = async (req, res) => {
	const { userId } = req.userData;

	if (!userId) {
		return res.status(401).json({ message: 'Auth failed' });
	}

	try {
		const id = req.params.id;

		const dealerFromDb = await dealersModel.getDealerById(id);

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

exports.deleteDealer = async (req, res) => {
	const { userId } = req.userData;

	if (!userId) {
		return res.status(401).json({ message: 'Auth failed' });
	}

	try {
		const id = req.params.id;

		const dealerFromDb = await dealersModel.getDealerById(id);

		if (!dealerFromDb) {
			return res.status(404).json({ message: 'Dealer not found' });
		}

		if (dealerFromDb.userId !== userId) {
			return res.status(401).json({ message: 'Auth failed' });
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
