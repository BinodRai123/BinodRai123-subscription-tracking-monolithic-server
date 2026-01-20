import { Router } from "express";

const subscriptionRoute = Router();

subscriptionRoute.post("/", (req, res) => res.send({ title: "new subscription created" }));

export default subscriptionRoute;
