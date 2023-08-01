const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/rooms (Create a new room)
router.post('/', authMiddleware.isAuthenticated, roomController.createRoom);

// GET /api/rooms (Get all rooms)
router.get('/', roomController.getAllRooms);

// GET /api/rooms/:id (Get room by ID)
router.get('/:id', roomController.getRoomById);

// PUT /api/rooms/:id (Update room by ID)
router.put('/:id', authMiddleware.isAuthenticated, roomController.updateRoom);

// DELETE /api/rooms/:id (Delete room by ID)
router.delete('/:id', authMiddleware.isAuthenticated, roomController.deleteRoom);

// GET /api/departments/:departmentId (Get all rooms under the same department)
router.get('/departments/:departmentId', roomController.getRoomsByDepartment);

module.exports = router;
