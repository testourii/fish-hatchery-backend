const express = require('express');
const router = express.Router();
const tankController = require('../controllers/tankController');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/tanks (Create a new tank)
router.post('/', authMiddleware.isAuthenticated, tankController.createTank);

// GET /api/tanks (Get all tanks)
router.get('/', tankController.getAllTanks);

// GET /api/tanks/:id (Get tank by ID)
router.get('/:id', tankController.getTankById);

// PUT /api/tanks/:id (Update tank by ID)
router.put('/:id', authMiddleware.isAuthenticated, tankController.updateTank);

// DELETE /api/tanks/:id (Delete tank by ID)
router.delete('/:id', authMiddleware.isAuthenticated, tankController.deleteTank);

// GET /api/rooms/:roomId (Get all tanks under the same room)
router.get('/rooms/:roomId', tankController.getTanksByRoom);

// POST /api/tanks/:tankId/metrics/:metricName (Add a new value with the current date to a specific metric at a tank)
router.post('/:tankId/metrics/:metricName', authMiddleware.isAuthenticated, tankController.addMetricValue);

module.exports = router;
