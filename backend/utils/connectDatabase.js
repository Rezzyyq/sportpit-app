import mongoose from "mongoose";

let connectionPromise;

export default function connectDatabase(mongoUri = process.env.MONGO_URI) {
  if (mongoose.connection.readyState >= 1) {
    return Promise.resolve(mongoose.connection);
  }

  if (!mongoUri) {
    return Promise.reject(new Error("MONGO_URI is not configured"));
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(mongoUri);
  }

  return connectionPromise;
}
