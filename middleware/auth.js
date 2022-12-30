const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/customErrors');
const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new CustomAPIError('No token provided', 401)
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        // const {username, id} = decoded
        const username = decoded
        req.user = username
        next();
    } catch {
        throw new CustomAPIError('Not authorized to access this route', 401)
    }
}

module.exports = authenticationMiddleware;