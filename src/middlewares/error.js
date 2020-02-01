const APIError = require('../APIError');

const extractMessage = err => {
    if (err instanceof APIError) {
        return err.message;
    }
    return err;
};


const extractStatus = err => {
    if (Number.isInteger(err.status)) {
        return err.status;
    }
    return 500;
};

module.exports = (err, req, res, _next) => {
    const code = Number.isInteger(err.code) ? err.code : undefined;
    const message = extractMessage(err);
    const status = extractStatus(err);
    const level = status < 500
        ? 'log'
        : 'error';
    console[level](
        'api call error',
        {
            err: err.stack || err,
            path: req.path,
            message,
            status,
        }
    );
    res.status(status).json({code, message});
};
