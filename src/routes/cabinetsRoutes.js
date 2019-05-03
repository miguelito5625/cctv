const router = require('express').Router();

const cabinetsController = require('../controllers/cabinetsController');

router.get('/cabinets', cabinetsController.cabinetEmpy);
// router.post('/cabinets/list', userController.camList);
// router.post('/cabinets/add', userController.camsAdd);
// router.post('/cabinets/update', userController.camsUpdate);
// router.post('/cabinets/delete', userController.camsDelete);

module.exports = router;
