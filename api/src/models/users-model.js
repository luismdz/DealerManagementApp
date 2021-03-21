const db = require('../db/db-connection');

class User {
	login = (user) => {
		return new Promise((resolve, reject) => {
			const sql = `
				select
					u.*,
					adm.status as isAdmin
				from users u
				left join admins adm on adm.userId = u.id
				where u.email = ?`;

			db.query(sql, [user.email], (err, rows) => {
				if (err) {
					reject(err);
					throw err;
				}

				return resolve(rows[0]);
			});
		});
	};

	createUser = (newUser) => {
		return new Promise((resolve, reject) => {
			try {
				db.beginTransaction((err) => {
					if (err) {
						reject(err);
						throw err;
					}

					const { dealer: dealerName, ...userData } = newUser;

					const sql = 'INSERT INTO Users SET ?';

					db.query(sql, [userData], (error, rows) => {
						if (error) {
							return db.rollback(() => {
								reject(error);
								throw error;
							});
						}

						const newDealer = {
							name: dealerName,
							userId: rows.insertId,
						};

						const sql = 'INSERT INTO Dealers SET ?';

						db.query(sql, [newDealer], (error, rows) => {
							if (error) {
								return db.rollback(() => {
									reject(error);
									throw error;
								});
							}

							db.commit((err) => {
								if (err) {
									return db.rollback(() => {
										reject(error);
										throw error;
									});
								}

								return resolve(rows);
							});
						});
					});
				});
			} catch (error) {
				reject(error);
				throw error;
			}
		});
	};

	getAll = () => {
		return new Promise((resolve, reject) => {
			const sql = `
				select
					u.*,
					d.name as dealer,
					adm.status as isAdmin
				from users u
				left join admins adm on adm.userId = u.id
				left join dealers d on d.userId = u.id`;

			db.query(sql, (err, rows) => {
				if (err) {
					reject(err);
					throw err;
				}
				resolve(rows);
			});
		});
	};

	getUserById = (id) => {
		return new Promise((resolve, reject) => {
			const sql = `
				select
					u.*,
					d.name as dealer,
					adm.status as isAdmin
				from users u
				left join admins adm on adm.userId = u.id
				left join dealers d on d.userId = u.id
				where u.id = ?`;

			db.query(sql, [id], (err, rows) => {
				if (err) {
					reject(err);
					throw err;
				}
				resolve(rows[0]);
			});
		});
	};

	updateUser = (id, user) => {
		return new Promise((resolve, reject) => {
			const keys = [];
			const values = [];
			const arr = Object.entries(user);

			arr.forEach(([key, value]) => {
				if (value) {
					keys.push(key);
					values.push(value);
				}
			});

			const columnSet = keys.map((key) => `${key} = ?`).join(', ');

			if (columnSet.length > 0) {
				const sql = `
					UPDATE users
					SET ${columnSet}
					WHERE id = ?`;
				return db.query(sql, [...values, id], (err, rows) => {
					if (err) {
						reject(err);
						throw err;
					}
					resolve(rows);
				});
			} else return reject('No values provided');
		});
	};

	deleteUser = (id) => {
		return new Promise((resolve, reject) => {
			const sql = 'DELETE FROM user WHERE id = ?';

			return db.query(sql, [id], (err, rows) => {
				if (err) {
					reject(err);
					throw err;
				}
				return resolve(rows);
			});
		});
	};
}

module.exports = new User();
