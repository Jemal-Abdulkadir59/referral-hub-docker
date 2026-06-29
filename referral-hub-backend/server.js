const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// UNCAUGHT EXCEPTION : eg. console.log(x) : ReferenceError x is not defined
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');

// TO CONNECT WITH ATLAS
// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD,
// );

// TO CONNECT WITH LOCAL MONGODB
// let DB = process.env.DATABASE_LOCAL;
// if (DB.includes('<PASSWORD>') && process.env.DATABASE_PASSWORD) {
//   DB = DB.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
// }

let DB;

if (process.env.NODE_ENV === 'docker') {
  DB = process.env.DATABASE_DOCKER;
} else {
  DB = process.env.DATABASE_LOCAL;
}

if (!DB) {
  throw new Error("Database connection string is not defined");
}

// DATABASE CONNECTION
mongoose.connect(DB).then((con) => {
  // console.log(con.connections);
  console.log('DB connection successful!');
});
// .catch((err) => console.log('Error!'));

// START SERVER
// const port = process.env.PORT || 8000;
// const server = app.listen(port, () => {
//   console.log(`App running on port ${port}...`);
// });

const port = process.env.PORT || 8000;

// CHANGE THIS: Add '0.0.0.0' as the host argument
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`App running on port ${port}...`);
});

// UNHANDLED REJECTION : any other rejection somewhere application
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1); // 0 for success and 1 for unhandle
  });
});
