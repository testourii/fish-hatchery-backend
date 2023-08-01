const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/departments (Create a new department)
router.post('/', authMiddleware.isAuthenticated, departmentController.createDepartment);

// GET /api/departments (Get all departments)
router.get('/', departmentController.getAllDepartments);

// GET /api/departments/:id (Get department by ID)
router.get('/:id', departmentController.getDepartmentById);

// PUT /api/departments/:id (Update department by ID)
router.put('/:id', authMiddleware.isAuthenticated, departmentController.updateDepartment);

// DELETE /api/departments/:id (Delete department by ID)
router.delete('/:id', authMiddleware.isAuthenticated, departmentController.deleteDepartment);

module.exports = router;
