const mysql = require('mysql');

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'test_dealers_db',
});

// Check connection
db.connect((error) => {
	if (error) {
		throw error;
	}
	console.log('Database connected!');
});

module.exports = db;
