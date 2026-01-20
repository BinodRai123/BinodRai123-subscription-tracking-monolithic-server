import mongoose from "mongoose";
import { MONGODB_URI, NODE_ENV } from "../config/env.js";

if (!MONGODB_URI) {
   throw new Error("please define the mongodb uri inside the .env<development/production>.local");
}

const ConnectToDB = async () => {
   try {
      await mongoose.connect(MONGODB_URI).then(() => console.log(`db is connected on ${NODE_ENV} mode`));
      // console.log("mongodb is connnected");
   } catch (error) {
      console.log("Error while connnecting to DB -> ", error);

      process.exit(1);
   }
};

export default ConnectToDB;
