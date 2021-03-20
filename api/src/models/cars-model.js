const db = require('../db/db-connection');

class Car {
	createCar = (newCar) => {
		return new Promise((resolve, reject) => {
			try {
				db.beginTransaction((err) => {
					if (err) {
						reject(err);
						throw err;
					}

					const { dealerId, ...carData } = newCar;

					const sql = 'INSERT INTO Cars SET ?';

					db.query(sql, [carData], (error, rows) => {
						if (error) {
							return db.rollback(() => {
								reject(error);
								throw error;
							});
						}

						const newDealerCar = {
							carId: rows.insertId,
							dealerId: dealerId,
						};

						const sql = 'INSERT INTO Dealer_Cars SET ?';

						db.query(sql, [newDealerCar], (error, rows) => {
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
			} catch (error) {}
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
			const sql = `
				select
					c.id,
					cb.name as brand,
					cm.name as model,
					c.color,
					c.year,
					dc.dealerId,
					d.name as dealer,
					c.createdById,
					c.createdAt
				from cars c
				left join dealer_cars dc on dc.carId = c.id
				left join dealers d on d.id = dc.dealerId
				left join carbrand_models cm on cm.id = c.carModelId
				left join carbrands cb on cb.id = cm.brandId
				where c.id = ?`;

			db.query(sql, [id], (error, rows) => {
				if (error) {
					reject(error);
					throw error;
				}

				return resolve(rows[0]);
			});
		});
	};

	getCarsByDealerId = (id) => {
		return new Promise((resolve, reject) => {
			const sql = `
				select distinct
					c.id,
					cb.name as brand,
					cm.name as model,
					c.color,
					c.year,
					dc.dealerId,
					d.name as Dealer,
					c.createdById,
					c.createdAt
			from cars c
			left join dealer_cars dc on dc.carId = c.id
			left join dealers d on d.id = dc.dealerId
			left join carbrand_models cm on cm.id = c.carModelId
			left join carbrands cb on cb.id = cm.brandId
			where d.id = ?`;

			db.query(sql, [id], (err, rows) => {
				if (err) {
					reject(err);
					throw err;
				}

				return resolve(rows);
			});
		});
	};

	updateCar = (id, car) => {
		return new Promise((resolve, reject) => {
			const keys = [];
			const values = [];
			const arr = Object.entries(car);

			arr.forEach(([key, value]) => {
				if (value) {
					keys.push(key);
					values.push(value);
				}
			});

			const columnSet = keys.map((key) => `${key} = ?`).join(', ');

			if (columnSet.length > 0) {
				const sql = `
					UPDATE cars
					SET ${columnSet}
					WHERE id = ?`;

				return db.query(sql, [...values, id], (err, rows) => {
					if (err) {
						reject(err);
						throw err;
					}

					return resolve(rows);
				});
			} else return reject('No values provided');
		});
	};

	deleteCar = (id) => {
		return new Promise((resolve, reject) => {
			const sql = 'DELETE FROM Cars WHERE id = ?';
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

module.exports = new Car();
