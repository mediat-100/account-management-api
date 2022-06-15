const express = require('express');
const { deposit, withdraw } = require('../controllers/transactionController');
const { transfer } = require('../controllers/transferController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.route('/deposit').post(auth, deposit);
router.route('/withdraw').post(auth, withdraw);
router.route('/transfer').post(auth, transfer);

module.exports = router;
