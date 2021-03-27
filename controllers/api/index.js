const router = require('express').Router();

const userRoutes = require('./user-routes');
const homeRoutes = require('./home-routes');

router.use('/users', userRoutes);
router.use('/home-routes', homeRoutes);

module.exports = router;
