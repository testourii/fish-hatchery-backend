const Room = require('../models/room');

// Create a new room
exports.createRoom = (req, res) => {
  const { name, departmentId, responsible } = req.body;
  const room = new Room({ name, departmentId, responsible });

  room
    .save()
    .then((createdRoom) => {
      res.status(201).json(createdRoom);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

// Get all rooms
exports.getAllRooms = (req, res) => {
  Room.find()
    .populate('departmentId', '-_id name location')
    .populate('responsible', '-_id email name')
    .populate('tankIds', '-_id')
    .then((rooms) => {
      res.status(200).json(rooms);
    })
    .catch((error) => {
      console.error(error); // Log the error for debugging
      res.status(500).json({ error: 'Internal server error' });
    });
};

// Get room by ID
exports.getRoomById = (req, res) => {
  const roomId = req.params.id;

  Room.findById(roomId)
    .populate('departmentId', '-_id name location')
    .populate('responsible', '-_id email name')
    .then((room) => {
      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }

      res.status(200).json(room);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

// Update room by ID
exports.updateRoom = (req, res) => {
  const roomId = req.params.id;
  const updatedData = req.body;

  Room.findByIdAndUpdate(roomId, updatedData, { new: true })
    .then((updatedRoom) => {
      if (!updatedRoom) {
        return res.status(404).json({ message: 'Room not found' });
      }

      res.status(200).json(updatedRoom);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

// Delete room by ID
exports.deleteRoom = (req, res) => {
  const roomId = req.params.id;

  Room.findByIdAndDelete(roomId)
    .then((deletedRoom) => {
      if (!deletedRoom) {
        return res.status(404).json({ message: 'Room not found' });
      }

      res.status(200).json({ message: 'Room deleted successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

// Get all rooms under the same department
exports.getRoomsByDepartment = (req, res) => {
  const departmentId = req.params.departmentId;

  Room.find({ departmentId })
    .populate("tankIds")
    .then((rooms) => {
      res.status(200).json(rooms);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Internal server error' });
    });
};
