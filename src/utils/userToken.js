
const jwt = require('jsonwebtoken');
const { TOKEN_KEY } = require('../config/env');

exports.createUserToken = (user) => {
    const payload = { id: user.userId, email: user.email };
    try {
        return jwt.sign(payload, TOKEN_KEY, { expiresIn: '1d' });
    } catch (err) {
        console.error('Error creating token:', err.message);
        return null;
    }
};

exports.verifyUserToken = (token) => {
    try {
        return jwt.verify(token, TOKEN_KEY);
    } catch (err) {
        console.error('Error verifying token:', err.message);
        return null;
    }
};