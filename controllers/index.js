const router = require('express').Router();

const apiRoutes = require('./api/workoutroutes.js');
const homeRoutes = require('./homeroute.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;