const express = require('express');
const { createAccount, getAccount } = require('../controllers/accountController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.route('/').post(auth, createAccount).get(auth, getAccount);

module.exports = router;

