const isValid = (value, regx, errorMessage) => {
    if (regx.test(value)) {
        return {
            error: false,
        };
    }

    return {
        error: true,
        message: errorMessage,
    };
};

module.exports = isValid;
