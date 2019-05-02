const router = require('express').Router();

const userController = require('../controllers/userController');

router.get('/', userController.indexPage);

router.get('/cams', userController.camsPage);
router.post('/cams/list', userController.camList);
router.post('/cams/add', userController.camsAdd);
router.post('/cams/update', userController.camsUpdate);
router.post('/cams/delete', userController.camsDelete);

//router.post('/test', userController.test);


// router.get('/update/:id', userController.edit);
// router.get('/update', userController.edit);

// router.get('/delete/:id', userController.delete);

router.use(userController.error404);


module.exports = router;
