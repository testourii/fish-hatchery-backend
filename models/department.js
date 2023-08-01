const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  responsible: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
});

const Department = mongoose.model('department', DepartmentSchema);

module.exports = Department;
