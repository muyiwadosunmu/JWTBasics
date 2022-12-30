const jwt = require('jsonwebtoken');
const {UnauthenticatedError} = require('../errors/unAuthenticated');


const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('No token provided')
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        // const {username, id} = decoded
        const username = decoded
        req.user = username
        next();
    } catch {
        throw new UnauthenticatedError('Not authorized to access this route',)
    }
}

module.exports = authenticationMiddleware;