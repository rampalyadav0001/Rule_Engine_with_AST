import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import Route from './routes/rule_routes.js';
// Load environment variables
dotenv.config({ path: './.env' });

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/rule', Route);

// Database connection
const connectDB = async () => {
  const URL = process.env.MONGODB_URI;
  if (!URL) {
    throw new Error('MongoDB url is not fetched from .env file');
  }
  //   console.log(URL);
  try {
    const connectionInstance = await mongoose.connect(URL, {
      useUnifiedTopology: true,
    });
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log('MONGODB connection FAILED ', error);
    process.exit(1);
  }
};
// Connect to DB and start server
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error in index.js file: ', error);
    process.exit(1);
  });
