module.exports = (err, req, res, next) => {
    const status = err.status || 500;
    const payload = {
        status: status === 500 ? 'Internal Server Error' : 'Error',
        message: err.message || 'Something went wrong',
    };
    if (process.env.NODE_ENV !== 'production') {
        payload.stack = err.stack;
    }
    res.status(status).json(payload);
};
