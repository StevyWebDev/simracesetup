const express = require('express');

const router = express.Router();
const SaisonController = require('../controllers/SaisonController');
const saisonMulter = require('../middlewares/saisonMulter');

router.get('/findAll', SaisonController.findAll);
router.get('/findOneById/:id', SaisonController.findOneById);
router.get('/findOneByYear/:year', SaisonController.findOneByYear);
router.get(
    '/findOneSetupSaisonByCircuit/:year/:circuit',
    SaisonController.findOneSetupSaisonByCircuit
);

router.post(
    '/create',
    saisonMulter,
    SaisonController.create,
    SaisonController.findAll
);

router.put('/update/:id', SaisonController.update, SaisonController.findAll);
router.put(
    '/addTasks/:id',
    SaisonController.addTasks,
    SaisonController.findAll
);

router.delete('/delete/:id', SaisonController.delete, SaisonController.findAll);

module.exports = router;
