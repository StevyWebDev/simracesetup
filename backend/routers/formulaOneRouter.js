/* eslint-disable no-unused-vars */
const express = require('express');

const router = express.Router();
const FormulaOneController = require('../controllers/FormulaOneController');
const formulaOneMulter = require('../middlewares/formulaOneMulter');

router.get('/findAll', FormulaOneController.findAll);
router.get('/findOneById/:id', FormulaOneController.findOneById);

router.post(
    '/create',
    formulaOneMulter,
    FormulaOneController.create,
    FormulaOneController.findAll
);

router.put(
    '/update/:id',
    FormulaOneController.update,
    FormulaOneController.findOneById
);

router.delete(
    '/delete/:id',
    FormulaOneController.delete,
    FormulaOneController.findAll
);

module.exports = router;
