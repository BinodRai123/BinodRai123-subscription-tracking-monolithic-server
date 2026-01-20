import express from "express";
import { PORT } from "./config/env.js";
import ConnectToDB from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";

//Importing "user, subscritipn , auth" Router
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import subscriptionRouter from "./routes/subscription.route.js";

const app = express(); //enabled the server
//it helps to parse the incoming requests and puts the parsed data in req.body
app.use(express.json());
//it helps to parse the incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: false }));
// it helps to parse the cookie from the request headers
app.use(cookieParser());

//applying router in api
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.use(errorMiddleware);

app.listen(PORT, async () => {
   await ConnectToDB();
   console.log(`server is running on port: ${PORT}`);
});
