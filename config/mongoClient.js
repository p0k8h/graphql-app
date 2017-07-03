const mongoose = require('mongoose');

module.exports = function initialize(app) {
   app.mdb = 'mongodb://localhost/jobsite';

  mongoose.set('debug', true);
  const db = mongoose.connection;
  db.on('connecting', () => {
    console.log('connecting to MongoDB...');
  });
  db.on('error', (error) => {
    console.error(`Error in MongoDb connection: ${error}`);
    mongoose.disconnect();
  });
  db.on('connected', () => {
    app.enable('mongodb');
    console.log('MongoDB connected!');
  });
  db.once('open', () => {
    console.log('MongoDB connection opened!');
  });
  db.on('reconnected', () => {
    console.log('MongoDB reconnected!');
  });
  db.on('disconnected', () => {
    app.disable('mongodb');
    console.log('MongoDB disconnected!');
    mongoose.connect(app.mdb, { server: { auto_reconnect: true } });
  });
  mongoose.connect(app.mdb, { server: { auto_reconnect: true } });
};
