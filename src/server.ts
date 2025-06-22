// src/server.ts
import dotenv from 'dotenv';
import app from './app';
import { connectDB } from './config/db';

dotenv.config();

const port = process.env.PORT || 5000;

async function bootstrap() {
  await connectDB();

  app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
  });
}

bootstrap();
