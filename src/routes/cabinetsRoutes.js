const router = require('express').Router();

const cabinetsController = require('../controllers/cabinetsController');

router.get('/cabinets', cabinetsController.cabinetEmpy);
router.post('/cabinets/list', cabinetsController.cabinetList);
router.post('/cabinets/add', cabinetsController.cabinetAdd);
router.post('/cabinets/update', cabinetsController.cabinetUpdate);
router.post('/cabinets/delete', cabinetsController.cabinetDelete);
router.post('/cabinets/state', cabinetsController.cabinetState);

module.exports = router;
