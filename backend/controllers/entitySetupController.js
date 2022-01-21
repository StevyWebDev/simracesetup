const EntitySetup = require('../schemas/entitySetupSchema');

exports.create = (req, res, next) => {
    const entitySetup = new EntitySetup({
        name: req.body.name,
        min: req.body.min,
        max: req.body.max,
        inteval: req.body.inteval,
        textList: req.body.listText,
    });

    entitySetup.save().then(() => next());
};

exports.findAll = (req, res) => {
    EntitySetup.find().then((data) => res.status(200).json(data));
};

exports.findOneById = (req, res) => {
    EntitySetup.findOne({ _id: req.params.id }).then((data) =>
        res.status(200).json(data)
    );
};

exports.update = (req, res, next) => {
    EntitySetup.updateOne({ _id: req.params.id }, req.body).then(() => next());
};

exports.delete = (req, res, next) => {
    EntitySetup.deleteOne({ _id: req.params.id }).then(() => next());
};
