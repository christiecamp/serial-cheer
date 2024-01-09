const router = require('express').Router();
const users = require('./user-route');
const thoughts = require('./thought-route');

router.use('/users', users);
router.use('/thoughts', thoughts);

module.exports = router;