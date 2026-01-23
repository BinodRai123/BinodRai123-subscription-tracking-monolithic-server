import { Router } from "express";
import { createSubscription, getUserSubscription } from "../controllers/subscription.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => res.send({ title: "get all subscription" }));

subscriptionRouter.get("/:id", (req, res) => res.send({ title: "get subscription by id" }));

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", (req, res) => res.send({ title: "update subscritiopn by id" }));

subscriptionRouter.delete("/:id", (req, res) => res.send({ title: "delete subscription" }));

subscriptionRouter.get("/user/:id", authorize, getUserSubscription);

subscriptionRouter.put("/:id/cancel", (req, res) => res.send({ title: "cancel subscription subscription" }));

subscriptionRouter.get("/upcoming-renewals", (req, res) => res.send({ title: "get upcoming renewals" }));

export default subscriptionRouter;
