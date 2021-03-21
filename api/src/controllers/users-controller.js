const userModel = require('../models/users-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _key = 'SJHAU8hushs8dnksjd99JD8IJHSD89dmmkjkhfsdkfhs';

exports.login = (req, res) => {
	const { email, password } = req.body;

	if (!email) {
		return res.status(401).json({
			message: 'Auth failed',
		});
	}

	userModel
		.login({ email })
		.then(async (user) => {
			if (!user) {
				return res.status(404).json({
					message: `User Not Found`,
				});
			}

			const passwordMatches = await bcrypt.compare(password, user.password);

			if (!passwordMatches) {
				return res.status(401).json({
					message: 'Auth failed',
				});
			}

			// Valid password & creating the jwt token
			const token = jwt.sign(
				{
					email: user.email,
					userId: user.id,
					isAdmin: user.isAdmin ? true : false,
				},
				_key,
				{ expiresIn: '6h' }
			);

			res.status(200).json({
				token,
			});
		})
		.catch(() =>
			res.status(401).json({
				message: 'Auth failed',
			})
		);
};

exports.createUser = (req, res) => {
	const { isAdmin } = req.userData;

	if (!isAdmin) {
		return res.status(401).json({ message: 'Auth invalid' });
	}

	const { firstName, lastName, email, age, password, dealer } = req.body;

	if (!firstName || !lastName || !email || !password) {
		return res.status(400).json({
			message:
				'All the fields [firstName, lastName, email, password, dealer] are required',
		});
	}

	bcrypt
		.hash(password, 10)
		.then((hash) => {
			const newUser = {
				firstName,
				lastName,
				email,
				password: hash,
				age,
				dealer,
			};

			userModel
				.createUser(newUser)
				.then((resp) => res.status(200).json(resp))
				.catch((err) =>
					res.status(400).json({
						message: 'Cannot create user',
						error: err,
					})
				);
		})
		.catch((error) => res.status(400).json({ error: error }));
};

exports.getUsers = (req, res) => {
	const { isAdmin } = req.userData;

	if (!isAdmin) {
		return res.status(401).json({ message: 'Not enough privileges' });
	}

	userModel
		.getAll()
		.then((users) => {
			users = users.map((user) => {
				const { password, ...userWithoutPassword } = user;
				userWithoutPassword.isAdmin = userWithoutPassword.isAdmin
					? true
					: false;

				return userWithoutPassword;
			});

			return res.status(200).json(users);
		})
		.catch((err) => res.status(400).json({ message: `${err}` }));
};

exports.getById = (req, res) => {
	const { userId, isAdmin } = req.userData;

	const id = req.params.id;

	if (!isAdmin && id != userId) {
		return res.status(401).json({ message: 'Auth failed' });
	}

	userModel
		.getUserById(id)
		.then((user) => {
			if (!user) {
				return res.status(404).json({
					message: `No user with id ${id}`,
				});
			}
			const { password, ...userWithoutPassword } = user;
			userWithoutPassword.isAdmin = userWithoutPassword.isAdmin ? true : false;

			return res.status(200).json(userWithoutPassword);
		})
		.catch((err) =>
			res.status(400).json({
				message: 'Invalid request',
				error: err,
			})
		);
};

exports.updateUser = (req, res) => {
	const { isAdmin, userId } = req.userData;
	const id = req.params.id;

	if (!isAdmin && id != userId) {
		return res.status(401).json({ message: 'Auth invalid' });
	}

	const user = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		age: req.body.age,
	};

	userModel
		.updateUser(id, user)
		.then((resp) => {
			if (resp.affectedRows > 0)
				return res.status(200).json({
					message: 'User Updated',
				});
			else
				return res.status(404).json({
					message: 'User Not Found',
				});
		})
		.catch((err) =>
			res.status(400).json({
				message: 'Invalid request',
				error: err,
			})
		);
};

exports.deleteUser = (req, res) => {
	const { isAdmin } = req.userData;

	if (!isAdmin) {
		return res.status(401).json({ message: 'Auth invalid' });
	}

	const id = req.params.id;

	userModel
		.deleteUser(id)
		.then((resp) => {
			console.log(resp);
			if (resp.affectedRows > 0) {
				return res.status(204).json();
			}

			return res.status(404).json({
				message: `No user with id ${id}`,
			});
		})
		.catch((err) =>
			res.status(400).json({
				message: 'Invalid request',
				error: err,
			})
		);
};
