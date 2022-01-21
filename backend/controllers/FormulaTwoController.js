const FormulaTwoSchema = require('../schemas/formulaTwoSchema');

exports.create = (req, res, next) => {
    const image = `images/formulaTwo/${req.file.filename}`;

    const newFormulaTwo = new FormulaTwoSchema({
        name: req.body.name,
        image,
    });

    newFormulaTwo
        .save()
        .then(() => next())
        .catch((err) => console.log(err));
};

exports.findAll = (req, res) => {
    FormulaTwoSchema.find()
        .then((data) => res.status(200).json(data))
        .catch((err) => console.log(err));
};

exports.findOneById = (req, res) => {
    FormulaTwoSchema.findOne({ _id: req.params.id })
        .then((data) => res.status(200).json(data))
        .catch((err) => console.log(err));
};

exports.update = (req, res, next) => {
    FormulaTwoSchema.updateOne({ _id: req.params.id }, req.body)
        .then(() => next())
        .catch((err) => console.log(err));
};

exports.delete = (req, res, next) => {
    FormulaTwoSchema.deleteOne({ _id: req.params.id })
        .then(() => next())
        .catch((err) => console.log(err));
};
