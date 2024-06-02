const { Register, Login } = require('../controllers/authController');
const { userVerification } = require('../middlewares/authMiddleware');
const router = require('express').Router();

router.route('/register').post(Register);
router.route('/login').post(Login);
router.route('/').post(userVerification);

module.exports = router;
