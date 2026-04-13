import mongoose from "mongoose";

let connectionPromise;

export default function connectDatabase(mongoUri = process.env.MONGO_URI) {
  if (mongoose.connection.readyState >= 1) {
    return Promise.resolve(mongoose.connection);
  }

  if (!mongoUri) {
    const error = new Error("MONGO_URI is not configured");
    error.publicMessage = "MONGO_URI не налаштований у Vercel";
    return Promise.reject(error);
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(mongoUri);
  }

  return connectionPromise;
}
