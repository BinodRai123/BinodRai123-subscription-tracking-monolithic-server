import express from "express";
import { PORT } from "./config/env.js";
import ConnectToDB from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";

//======= application routes imports ======== //
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import subscriptionRouter from "./routes/subscription.route.js";

const app = express(); //enabled the server

// ======== express middlewares ========= //

// 1. Handle JSON data
// Without this, req.body will be 'undefined'.
app.use(express.json());

// 2. Handle Form data
// This allows your server to read data sent from standard HTML forms.
app.use(express.urlencoded({ extended: false }));

// 3. Handle Cookies
app.use(cookieParser());

// ======== applying the routes to the application ========= //
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

// Express only comes here if someone calls next(err) above
// if any error occur in the above routes then it will be handle here
app.use(errorMiddleware);

app.listen(PORT, async () => {
   await ConnectToDB();
   console.log(`server is running on port: ${PORT}`);
});
