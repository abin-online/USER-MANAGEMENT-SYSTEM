import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
configDotenv()
const url = process.env.MONGO_URL;
console.log(url);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${url}`);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;