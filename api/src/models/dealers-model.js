const db = require('../db/db-connection');

class Dealer {
	createDealer = (newDealer) => {
		return new Promise((resolve, reject) => {
			// const sql = 'INSERT INTO Users SET ?';
			// db.query(sql, [newUser], (err, rows) => {
			// 	if (err) {
			// 		reject(err);
			// 		throw err;
			// 	}
			// 	return resolve(rows);
			// });
		});
	};

	getAll = () => {
		return new Promise((resolve, reject) => {
			// const sql = `
			// 	select
			// 		u.*,
			// 		d.name as dealer
			// 	from users u
			// 	left join dealers d on d.userId = u.id`;
			// db.query(sql, (err, rows) => {
			// 	if (err) {
			// 		reject(err);
			// 		throw err;
			// 	}
			// 	resolve(rows);
			// });
		});
	};

	getDealerById = (id) => {
		return new Promise((resolve, reject) => {
			// const sql = `
			// 	select
			// 		u.*,
			// 		d.name as dealer
			// 	from users u
			// 	left join dealers d on d.userId = u.id
			// 	where u.id = ?`;
			// db.query(sql, [id], (err, rows) => {
			// 	if (err) {
			// 		reject(err);
			// 		throw err;
			// 	}
			// 	resolve(rows[0]);
			// });
		});
	};

	updateDealer = (id, dealer) => {
		return new Promise((resolve, reject) => {
			// const keys = [];
			// const values = [];
			// const arr = Object.entries(user);
			// arr.forEach(([key, value]) => {
			// 	if (value) {
			// 		keys.push(key);
			// 		values.push(value);
			// 	}
			// });
			// const columnSet = keys.map((key) => `${key} = ?`).join(', ');
			// if (columnSet.length > 0) {
			// 	const sql = `
			// 		UPDATE users
			// 		SET ${columnSet}
			// 		WHERE id = ?`;
			// 	return db.query(sql, [values, id], (err, rows) => {
			// 		if (err) {
			// 			reject(err);
			// 			throw err;
			// 		}
			// 		console.log(rows);
			// 		resolve(rows);
			// 	});
			// } else return reject('No values provided');
		});
	};

	deleteDealer = (id) => {
		return new Promise((resolve, reject) => {
			// const sql = 'DELETE FROM user WHERE id = ?';
			// return db.query(sql, [id], (err, rows) => {
			// 	if (err) {
			// 		reject(err);
			// 		throw err;
			// 	}
			// 	return resolve(rows);
			// });
		});
	};
}

module.exports = new Dealer();
