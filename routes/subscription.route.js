import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => res.send({ title: "get all subscription" }));

subscriptionRouter.get("/:id", (req, res) => res.send({ title: "get subscription by id" }));

subscriptionRouter.post("/", (req, res) => res.send({ title: "create new subscription created" }));

subscriptionRouter.put("/:id", (req, res) => res.send({ title: "update subscritiopn by id" }));

subscriptionRouter.delete("/:id", (req, res) => res.send({ title: "delete subscription" }));

subscriptionRouter.get("/user/:id", (req, res) => res.send({ title: "get all user subscription" }));

subscriptionRouter.put("/:id/cancel", (req, res) => res.send({ title: "cancel subscription subscription" }));

subscriptionRouter.get("/upcoming-renewals", (req, res) => res.send({ title: "get upcoming renewals" }));

export default subscriptionRouter;
