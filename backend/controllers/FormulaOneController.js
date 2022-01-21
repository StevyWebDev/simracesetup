const FormulaOneSchema = require('../schemas/formulaOneSchema');

exports.create = (req, res, next) => {
    const image = `images/formulaOne/${req.file.filename}`;
    const newFormulaOne = new FormulaOneSchema({
        name: req.body.name,
        image,
    });

    newFormulaOne
        .save()
        .then(() => next())
        .catch((err) => console.log(err));
};

exports.findAll = (req, res) => {
    FormulaOneSchema.find()
        .then((data) => res.status(200).json(data))
        .catch((err) => console.log(err));
};

exports.findOneById = (req, res) => {
    FormulaOneSchema.findOne({ _id: req.params.id })
        .then((data) => res.status(200).json(data))
        .catch((err) => console.log(err));
};

exports.update = (req, res, next) => {
    FormulaOneSchema.updateOne({ _id: req.params.id }, req.body)
        .then(() => next())
        .catch((err) => console.log(err));
};

exports.delete = (req, res, next) => {
    FormulaOneSchema.deleteOne({ _id: req.params.id })
        .then(() => next())
        .catch((err) => console.log(err));
};
