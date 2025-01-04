import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_STRINGS, {
      dbName: "pinterest",
    });
    console.log("db is connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
