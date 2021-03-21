const jwt = require('jsonwebtoken');
const _key = 'SJHAU8hushs8dnksjd99JD8IJHSD89dmmkjkhfsdkfhs';

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];

		const decodedToken = jwt.verify(token, _key);
		req.userData = {
			email: decodedToken.email,
			userId: decodedToken.userId,
			isAdmin: decodedToken.isAdmin,
		};
		next();
	} catch (error) {
		res.status(401).json({ message: 'Auth failed' });
	}
};
