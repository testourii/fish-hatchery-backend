const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      retryWrites: true,
      w: 'majority',
    });
    console.log('MongoDB successfully connected...');
  } catch (err) {
    console.error(err.message);
    //Exit process with failure
  }
};

module.exports = connectDB;
