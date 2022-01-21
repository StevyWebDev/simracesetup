const isEmpty = (value, errorMessage) => {
    console.log(value);
    if (value === '' || value === undefined) {
        return {
            error: true,
            message: errorMessage,
        };
    }

    return {
        error: false,
    };
};

module.exports = isEmpty;
