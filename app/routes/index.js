const express = require('express');
const router = express.Router();
const userRouter = require('./user.router');
const formRouter = require('./form.router');

router.use('/api/users', userRouter);
router.use('/api/forms',formRouter);

module.exports = router;