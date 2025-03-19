import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
    throw new Error('MongoDB URI is missing in your environment variables');
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);

        console.log(`MongoDB connected to in ${NODE_ENV} mode`);
    } catch (err) {
        console.log(`MongoDB connection error: ${err}`);
        process.exit(1);
    }
}

export default connectToDatabase;