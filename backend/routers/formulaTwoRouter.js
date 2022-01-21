const express = require('express');

const router = express.Router();
const FormulaTwoController = require('../controllers/FormulaTwoController');
const formulaTwoMulter = require('../middlewares/formulaTwoMulter');

router.get('/findAll', FormulaTwoController.findAll);
router.get('/findOneById/:id', FormulaTwoController.findOneById);

router.post(
    '/create',
    formulaTwoMulter,
    FormulaTwoController.create,
    FormulaTwoController.findAll
);

router.put(
    '/update/:id',
    FormulaTwoController.update,
    FormulaTwoController.findOneById
);

router.delete(
    '/delete/:id',
    FormulaTwoController.delete,
    FormulaTwoController.findAll
);

module.exports = router;
