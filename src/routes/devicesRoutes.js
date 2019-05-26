const router = require('express').Router();

const userController = require('../controllers/devicesController');

router.get('/', userController.indexPage);

router.get('/devices', userController.devicesPage);
router.post('/devices/list', userController.deviceList);
router.get('/devices/typedevicelist', userController.typeDeviceList);
router.get('/devices/brandlist', userController.brandsList);
router.post('/devices/add', userController.devicesAdd);
router.post('/devices/addnewtypedivice', userController.devicesAddNewTypeDivice);
router.post('/devices/addnewbrand', userController.devicesAddNewBrand);
router.post('/devices/update', userController.devicesUpdate);
router.post('/devices/delete', userController.devicesDelete);
router.post('/devices/state', userController.deviceState);


//router.post('/test', userController.test);


// router.get('/update/:id', userController.edit);
// router.get('/update', userController.edit);

// router.get('/delete/:id', userController.delete);

router.use(userController.error404);


module.exports = router;
