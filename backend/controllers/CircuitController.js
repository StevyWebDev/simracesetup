const CircuitSchema = require('../schemas/circuitSchema');
const isEmpty = require('../function/isEmpty');

exports.create = (req, res, next) => {
    const nameVerify = isEmpty(
        req.body.name,
        'Vous devez entrer un nom de Grand Prix'
    );
    const nationVerify = isEmpty(req.body.nation, 'Vous devez entrer un Pays');
    const imageVerify = isEmpty(req.file, 'Vous devez entrer une image');

    if (!nameVerify.error && !nationVerify.error && !imageVerify.error) {
        const image = `images/circuits/${req.file.filename}`;
        const newCircuit = new CircuitSchema({
            name: req.body.name,
            nation: req.body.nation,
            image,
        });

        newCircuit
            .save()
            .then(() => next())
            .catch((err) => console.log(err));
    } else {
        const dataError = [];
        if (nameVerify.error) dataError.push(nameVerify.message);
        if (nationVerify.error) dataError.push(nationVerify.message);
        if (imageVerify.error) dataError.push(imageVerify.message);
        res.status(200).json({
            error: dataError,
        });
    }
};

exports.findAll = (req, res, next) => {
    CircuitSchema.find()
        .then((data) => {
            if (req.saisonUpdate) {
                req.task = data;
                next();
            } else {
                res.status(200).json(data);
            }
        })
        .catch((err) => console.log(err));
};

exports.findOneById = (req, res) => {
    CircuitSchema.findOne({ _id: req.params.id })
        .then((data) => res.status(200).json(data))
        .catch((err) => console.log(err));
};

exports.update = (req, res, next) => {
    const nameVerify = isEmpty(
        req.body.name,
        'Vous devez entrer un nom de Grand Prix'
    );
    const nationVerify = isEmpty(req.body.nation, 'Vous devez entrer un Pays');
    if (!nameVerify.error && !nationVerify.error) {
        CircuitSchema.updateOne({ _id: req.params.id }, req.body)
            .then(() => next())
            .catch((err) => console.log(err));
    } else {
        const dataError = [];
        if (nameVerify.error) dataError.push(nameVerify.message);
        if (nationVerify.error) dataError.push(nationVerify.message);

        res.status(200).json({
            error: dataError,
        });
    }
};

exports.delete = (req, res, next) => {
    CircuitSchema.deleteOne({ _id: req.params.id })
        .then(() => {
            req.saisonUpdate = true;
            next();
        })
        .catch((err) => console.log(err));
};
