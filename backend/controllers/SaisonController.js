/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable prettier/prettier */
const path = require('path');
const saisonSchema = require('../schemas/saisonSchema');
const SaisonSchema = require('../schemas/saisonSchema');
const { login } = require('./UserController');

exports.create = (req, res, next) => {
    const image = `images/saison/${req.file.filename}`;
    const newSaison = new SaisonSchema({
        year: req.body.year,
        image,
    });

    newSaison
        .save()
        .then(() => next())
        .catch((err) => console.log(err));
};

exports.findAll = (req, res) => {
    SaisonSchema.find()
        .populate([
            'formulaOneTeams',
            'formulaTwoTeams',
            'circuits',
            'entitySetups',
        ])
        .then((data) => {
            if (req.task) {
                const newData = {
                    task: req.task,
                    saison: data.sort((a, b) => b.year - a.year),
                };

                res.status(200).json(newData);
            } else {
                res.status(200).json(data.sort((a, b) => b.year - a.year));
            }
        })
        .catch((err) => console.log(err));
};

exports.findOneById = (req, res) => {
    SaisonSchema.findOne({ _id: req.params.id })
        .populate(['formulaOneTeams', 'formulaTwoTeams', 'circuits'])
        .then((data) => res.status(200).json(data))
        .catch((err) => console.log(err));
};

exports.findOneByYear = (req, res) => {
    SaisonSchema.findOne({ year: req.params.year })
        .populate(['formulaOneTeams', 'formulaTwoTeams', 'circuits'])
        .then((data) => res.status(200).json(data))
        .catch((err) => console.log(err));
};

exports.findOneSetupSaisonByCircuit = (req, res) => {
    console.log(req.params.circuit);
    saisonSchema
        .findOne({ _id: req.params.year })
        .populate({
            path: 'setups',
            populate: [
                { path: 'formulaOne' },
                { path: 'formulaTwo' },
                { path: 'user', select: 'pseudo' },
            ],
            match: {
                circuit: req.params.circuit,
            },
        })
        .select('setups')
        .then((data) => res.status(200).json(data))
        .catch((err) => console.log(err));
};

exports.update = (req, res, next) => {
    SaisonSchema.updateOne({ _id: req.params.id }, req.body)
        .then(() => next())
        .catch((err) => console.log(err));
};

exports.addTasks = (req, res, next) => {
    function arrayMove(datas, fromIndex, toIndex) {
        const element = datas[fromIndex];
        datas.splice(fromIndex, 1);
        datas.splice(toIndex, 0, element);
    }

    SaisonSchema.findOne({ _id: req.params.id }, (error, saison) => {
        if (!saison) {
            console.log(error);
        }

        console.log(req.body);

        const datas = req.body;
        let tasks;

        switch (datas.type) {
            case 'circuit':
                tasks = saison.circuits;
                break;
            case 'formulaOneTeams':
                tasks = saison.formulaOneTeams;
                break;
            case 'formulaTwoTeams':
                tasks = saison.formulaTwoTeams;
                break;
            case 'entitySetups':
                tasks = saison.entitySetups;
                break;
            default:
                tasks = null;
                break;
        }

        if (tasks) {
            datas.delete.forEach((task) => {
                if (tasks.indexOf(task, 0) >= 0) {
                    tasks.splice(tasks.indexOf(task, 0), 1);
                }
            });

            datas.add.forEach((task) => {
                if (tasks.indexOf(task, 0) < 0) {
                    tasks.push(task);
                }
                arrayMove(
                    tasks,
                    tasks.indexOf(task, 0),
                    datas.add.indexOf(task, 0)
                );
            });
        }

        saison
            .save()
            .then(() => next())
            .catch((err) => console.log(err));
    });
};

exports.addSetup = (req, res, next) => {
    SaisonSchema.findOne({ _id: req.params.year }, (error, saison) => {
        if (!saison) {
            console.log(error);
        }

        const data = req.setup;
        saison.setups.push(data);

        saison
            .save()
            .then(() => next())
            .catch((err) => console.log(err));
    });
};

exports.delete = (req, res, next) => {
    SaisonSchema.deleteOne({ _id: req.params.id })
        .then(() => next())
        .catch((err) => console.log(err));
};
