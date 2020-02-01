const APIError = require('../APIError');
const config = require('config');

module.exports = (req, res, next) => {
    if (req.headers['access-token'] === config.accessToken) {
        return next();
    }
    next(APIError.unauthorized());
};
