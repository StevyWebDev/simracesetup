const express = require('express');

const router = express.Router();
const CircuitController = require('../controllers/CircuitController');
const SaisonController = require('../controllers/SaisonController');
const circuitMulter = require('../middlewares/circuitMulter');

router.get('/findAll', CircuitController.findAll);
router.get('/findOneById/:id', CircuitController.findOneById);

router.post(
    '/create',
    circuitMulter,
    CircuitController.create,
    CircuitController.findAll
);

router.put('/update/:id', CircuitController.update, CircuitController.findAll);

router.delete(
    '/delete/:id',
    CircuitController.delete,
    CircuitController.findAll,
    SaisonController.findAll
);

module.exports = router;
