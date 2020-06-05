const express = require('express');
const router = express.Router();
const passport = require('passport');
const Receiptcontroller = require('../controllers/receipt');

router.post('/add', passport.authenticate(['jwt'], { session: false }), Receiptcontroller.add);
router.get('/search', passport.authenticate(['jwt'], { session: false }), Receiptcontroller.search);
router.delete('/delete', passport.authenticate(['jwt'], { session: false }), Receiptcontroller.delete);
router.post('/verifyToken', Receiptcontroller.verifyToken);

module.exports = router;