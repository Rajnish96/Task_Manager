const { verifyUserToken } = require('../utils/userToken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send({ message: `A token is required for authentication` }).end()
    }
    try {
        const decoded = verifyUserToken(token)
        req.user = decoded
    } catch (err) {
        return res.status(401).send('Invalid Token')
    }
    return next()
}

module.exports = verifyToken
