const Tank = require('../models/tank');

// Create a new tank
exports.createTank = (req, res) => {
  const { name, roomId, metrics } = req.body;
  const tank = new Tank({ name, roomId, metrics });

  tank.save()
    .then((createdTank) => {
      res.status(201).json(createdTank);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

// Get all tanks
exports.getAllTanks = (req, res) => {
  Tank.find()
    .then((tanks) => {
      res.status(200).json(tanks);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

// Get tank by ID
exports.getTankById = (req, res) => {
  const tankId = req.params.id;

  Tank.findById(tankId)
    .then((tank) => {
      if (!tank) {
        return res.status(404).json({ message: 'Tank not found' });
      }

      res.status(200).json(tank);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

// Update tank by ID
exports.updateTank = (req, res) => {
  const tankId = req.params.id;
  const updatedData = req.body;

  Tank.findByIdAndUpdate(tankId, updatedData, { new: true })
    .then((updatedTank) => {
      if (!updatedTank) {
        return res.status(404).json({ message: 'Tank not found' });
      }

      res.status(200).json(updatedTank);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

// Delete tank by ID
exports.deleteTank = (req, res) => {
  const tankId = req.params.id;

  Tank.findByIdAndDelete(tankId)
    .then((deletedTank) => {
      if (!deletedTank) {
        return res.status(404).json({ message: 'Tank not found' });
      }

      res.status(200).json({ message: 'Tank deleted successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

// Get all tanks under the same room
exports.getTanksByRoom = (req, res) => {
  const roomId = req.params.roomId;

  Tank.find({ roomId })
    .then((tanks) => {
      res.status(200).json(tanks);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

// Add a new value with the current date to a specific metric at a tank
exports.addMetricValue = (req, res) => {
  const tankId = req.params.tankId;
  const metricName = req.params.metricName;
  const value = req.body.value; // Value to be added

  const newValue = {
    timestamp: new Date(), // Set the current date and time as the timestamp
    value: value,
  };

  Tank.findById(tankId)
    .then((tank) => {
      if (!tank) {
        return res.status(404).json({ message: 'Tank not found' });
      }

      // Find the metric with the specified name in the tank's metrics array
      const metricIndex = tank.metrics.findIndex((metric) => metric.name === metricName);

      // If the metric with the specified name doesn't exist, create it
      if (metricIndex === -1) {
        tank.metrics.push({ name: metricName, readings: [newValue] });
      } else {
        tank.metrics[metricIndex].readings.push(newValue);
      }

      return tank.save();
    })
    .then((updatedTank) => {
      res.status(201).json(updatedTank);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Internal server error' });
    });
};
