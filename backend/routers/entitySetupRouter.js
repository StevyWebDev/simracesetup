const express = require('express');

const router = express.Router();
const EntitySetupController = require('../controllers/entitySetupController');

router.post(
    '/create',
    EntitySetupController.create,
    EntitySetupController.findAll
);

router.get('/findAll', EntitySetupController.findAll);
router.get('findOneById/:id', EntitySetupController.findOneById);

router.put(
    '/update/:id',
    EntitySetupController.update,
    EntitySetupController.findAll
);

router.delete(
    '/delete/:id',
    EntitySetupController.delete,
    EntitySetupController.findAll
);

module.exports = router;
