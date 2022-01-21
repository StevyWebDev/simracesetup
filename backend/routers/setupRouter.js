const express = require('express');

const router = express.Router();
const SetupController = require('../controllers/SetupController');
const SaisonController = require('../controllers/SaisonController');

router.post(
    '/create/:year/:circuit',
    SetupController.create,
    SaisonController.addSetup,
    SaisonController.findOneSetupSaisonByCircuit
);

module.exports = router;
