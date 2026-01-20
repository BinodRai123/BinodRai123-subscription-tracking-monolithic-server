import express from "express";
import { PORT } from "./config/env.js";

//Importing "user, subscritipn , auth" Router
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import subscriptionRouter from "./routes/subscription.route.js";

const app = express(); //enabled the server

//applying router in api
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.listen(PORT, () => {
   console.log(`server is running on port: ${PORT}`);
});
