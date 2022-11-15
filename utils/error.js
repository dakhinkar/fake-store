const createError = (code, message) => {
    const error = new Error();
    error.status = code;
    error.message = message;
    return error;
}

module.exports = createError;