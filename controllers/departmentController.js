const Department = require('../models/department');

// Create a new department
exports.createDepartment = (req, res) => {
  const { name, responsible } = req.body;
  const department = new Department({ name, responsible });

  department.save()
    .then((createdDepartment) => {
      res.status(201).json(createdDepartment);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

// Get all departments
exports.getAllDepartments = (req, res) => {
  Department.find()
    .then((departments) => {
      res.status(200).json(departments);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

// Get department by ID
exports.getDepartmentById = (req, res) => {
  const departmentId = req.params.id;

  Department.findById(departmentId)
    .then((department) => {
      if (!department) {
        return res.status(404).json({ message: 'Department not found' });
      }

      res.status(200).json(department);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

// Update department by ID
exports.updateDepartment = (req, res) => {
  const departmentId = req.params.id;
  const updatedData = req.body;

  Department.findByIdAndUpdate(departmentId, updatedData, { new: true })
    .then((updatedDepartment) => {
      if (!updatedDepartment) {
        return res.status(404).json({ message: 'Department not found' });
      }

      res.status(200).json(updatedDepartment);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

// Delete department by ID
exports.deleteDepartment = (req, res) => {
  const departmentId = req.params.id;

  Department.findByIdAndDelete(departmentId)
    .then((deletedDepartment) => {
      if (!deletedDepartment) {
        return res.status(404).json({ message: 'Department not found' });
      }

      res.status(200).json({ message: 'Department deleted successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Internal server error' });
    });
};
