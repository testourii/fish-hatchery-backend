const mongoose = require('mongoose');

const ReadingSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  value: { type: Number, required: true },
});

const MetricSchema = new mongoose.Schema({
  name: { type: String, required: true },
  readings: [ReadingSchema],
});

const TankSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'room', required: true },
  metrics: [MetricSchema],
});

const Tank = mongoose.model('tank', TankSchema);

module.exports = Tank;
