const { default: mongoose } = require("mongoose");

const connectToDB = async () => {
  const connectionURL = process.env.MONGODB_URL;

  mongoose
    .connect(connectionURL)
    .then(() => console.log("database connection is successfull"))
    .catch((error) => console.log(error));
};

export  {connectToDB};







// import mongoose from "mongoose";

// const MONGODB_URL = process.env.MONGODB_URI; // Add your MongoDB URI to .env.local

// if (!MONGODB_URL) {
//   throw new Error(
//     "Please define the MONGODB_URI environment variable inside .env.local"
//   );
// }

// /**
//  * Global is used here to maintain a cached connection across hot reloads
//  * in development. This prevents connections growing exponentially
//  * during API Route usage.
//  */
// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function connectToDB() {
//   if (cached.conn) {
//     return cached.conn; // Use cached connection if available
//   }

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
//       return mongoose;
//     });
//   }

//   try {
//     cached.conn = await cached.promise;
//     console.log("Connected to MongoDB");
//     return cached.conn;
//   } catch (error) {
//     console.error("Failed to connect to MongoDB:", error);
//     throw error;
//   }
// }

// export { connectToDB }; // Export the function