const mongoose = require('mongoose');

const ATLAS_CONNECTION = process.env.DATABASE_ATLAS_URI || 'mongodb://127.0.0.1:27017/mt-organizator'

mongoose.connect(ATLAS_CONNECTION);
mongoose.connection.on('connected', () => console.info('Mongoose default connection open'));
mongoose.connection.on('error', err => console.error(`Mongoose default connection error: ${err}`));
mongoose.connection.on('disconnected', () => console.info('Mongoose default connection disconnected'));
 
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.info('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});