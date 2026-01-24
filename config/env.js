import { config } from "dotenv";

//It load environment value in the
//GLOBAL {"process.env"}
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

//coming from the env file
//and exporting as PORT
export const {
   PORT,
   NODE_ENV,
   MONGODB_URI,
   JWT_SECRET,
   JWT_EXPIRES_IN,
   ARCJET_KEY,
   ARCJET_ENV,
   QSTASH_URL,
   QSTASH_TOKEN,
   SERVER_URL,
} = process.env;
