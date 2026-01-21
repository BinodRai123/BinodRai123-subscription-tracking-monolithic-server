import { config } from "dotenv";

//It load environment value in the
//GLOBAL {"process.env"}
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

//coming from the env file
//and exporting as PORT
export const { PORT, NODE_ENV, MONGODB_URI, JWT_SECRET, JWT_EXPIRES_IN } = process.env;
