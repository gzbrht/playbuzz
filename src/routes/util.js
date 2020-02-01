'use strict';
const Promise = require('bluebird');

module.exports.withPromise = promiseFunction => {
    return function withPromiseHandler(req, res, next) {
        Promise.resolve(promiseFunction(req))
        .then(results => res.status(200).json(results))
        .catch(next);
    };
};
