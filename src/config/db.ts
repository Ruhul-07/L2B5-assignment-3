import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL as string);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('DB connection failed:', error);
    process.exit(1);
  }
};