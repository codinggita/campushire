const express = require('express');
const router = express.Router();
const { login, studentLogin, companyLogin } = require('../controllers/authController');

router.post('/login', login);
router.post('/student-login', studentLogin);
router.post('/company-login', companyLogin);

module.exports = router;
