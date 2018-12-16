const router = require('express').Router();

const userController = require('../controllers/userController');

router.get('/', userController.indexPage);
router.post('/test', userController.test);
router.get('/list', userController.consulta);
router.post('/add', userController.save);
router.get('/update/:id', userController.edit);
router.post('/update/:id', userController.update);
// router.get('/delete/:id', userController.delete);
router.post('/delete', userController.delete);
router.use(userController.error404);


module.exports = router;
