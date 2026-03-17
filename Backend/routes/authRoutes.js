const express = require('express');
const router = express.Router();
const { login, studentLogin, companyLogin, studentRegister, companyRegister, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', login);
router.post('/student-login', studentLogin);
router.post('/company-login', companyLogin);
router.post('/student-register', studentRegister);
router.post('/company-register', companyRegister);
router.get('/me', protect, getMe);

module.exports = router;
