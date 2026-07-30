// Load env
require('dotenv').config({ path: './config.env' }); //aws not working with we will fix it later

// Prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// UNCAUGHT EXCEPTION
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// App
const app = require('./app');

// ✅ CHECK DATABASE URL (important for Docker & local)
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

// ✅ CONNECT TO DATABASE (Prisma way)
async function connectDB() {
  try {
    await prisma.$connect();
    console.log('PostgreSQL connected successfully!');
  } catch (err) {
    console.log('DB CONNECTION ERROR!');
    console.log(err.message);
    process.exit(1);
  }
}

// START SERVER
const port = process.env.PORT || 8000;

async function startServer() {
  await connectDB();

  const server = app.listen(port, '0.0.0.0', () => {
    console.log(`App running on port ${port}...`);
  });

  // UNHANDLED REJECTION
  process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! Shutting down...');
    console.log(err); // ✅ prints FULL stack trace
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });
}

// RUN
startServer();
