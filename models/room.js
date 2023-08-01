const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'department', required: true },
  responsible: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  tankIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tank' }],
});

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
