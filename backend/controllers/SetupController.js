/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const SetupSchema = require('../schemas/setupSchema');

exports.create = (req, res, next) => {
    const { formulaOne, formulaTwo, circuit, data, user } = req.body;
    const setupSchema = new SetupSchema({
        formulaOne,
        formulaTwo,
        circuit,
        data,
        user,
    });

    setupSchema
        .save()
        .then((dataSave) => {
            req.setup = dataSave.id;
            next();
        })
        .catch((err) => console.log(err));
};
