import express from "express";
import { PORT } from "./config/env.js";
import ConnectToDB from "./database/mongodb.js";

//Importing "user, subscritipn , auth" Router
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import subscriptionRouter from "./routes/subscription.route.js";

const app = express(); //enabled the server
//applying router in api
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.listen(PORT, async () => {
   await ConnectToDB();
   console.log(`server is running on port: ${PORT}`);
});
