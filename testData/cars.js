const fetch = require('node-fetch-npm');

const getCars = async () => {
	const result = await fetch(
		'https://private-anon-43c806ca20-carsapi1.apiary-mock.com/manufacturers'
	);

	const data = await result.json();
	const brandNames = data.map((x) => {
		const name = x.name;
		return name[0].toUpperCase() + name.slice(1);
	});

	console.log(brandNames);
};

getCars();
