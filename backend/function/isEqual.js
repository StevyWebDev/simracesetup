const isEqual = (value, confirmValue, errorMessage) => {
    if (value === confirmValue) {
        return {
            error: false,
        };
    }

    return {
        error: true,
        message: errorMessage,
    };
};

module.exports = isEqual;
