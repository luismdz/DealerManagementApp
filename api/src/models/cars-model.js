const db = require('../db/db-connection');

class Car {
	createCar = (newCar) => {
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

	getCarBrands = () => {
		return new Promise((resolve, reject) => {
			const sql = `
                select distinct
                    b.*
                from carbrands b
                inner join carbrand_models m on m.brandId = b.id
                order by b.name
            `;

			db.query(sql, (err, rows) => {
				if (err) {
					reject(err);
					throw err;
				}

				resolve(rows);
			});
		});
	};

	getCarModelsByBrandId = (marcaId) => {
		return new Promise((resolve, reject) => {
			const sql = `
                select distinct
                    m.id as modelId,
                    m.name
                from carbrand_models m
                where brandId = ?
                order by name
            `;

			db.query(sql, [marcaId], (err, rows) => {
				if (err) {
					reject(err);
					throw err;
				}

				resolve(rows);
			});
		});
	};

	getCarModels = () => {
		return new Promise((resolve, reject) => {
			const sql = `
                select distinct
                    m.*
                from carbrand_models m
                order by brandId, name
            `;

			db.query(sql, (err, rows) => {
				if (err) {
					reject(err);
					throw err;
				}

				resolve(rows);
			});
		});
	};

	getAllCars = () => {
		return new Promise((resolve, reject) => {
			const sql = `
                select
                    c.*,
                    cb.name as Brand,
                    cm.name as Model
                from cars c 
                left join carbrand_models cm on cm.id = c.carModelId
                left join carbrands cb on cb.id = cm.brandId`;

			db.query(sql, (err, rows) => {
				if (err) {
					reject(err);
					throw err;
				}
				return resolve(rows);
			});
		});
	};

	getCarById = (id) => {
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

	updateCar = (id, user) => {
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

	deleteCar = (id) => {
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

module.exports = new Car();
