import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => res.send({ title: "get all users" }));

userRouter.get("/:id", (req, res) => res.send({ title: "get user by ID" }));

userRouter.post("/", (req, res) => res.send({ title: "create new user" }));

userRouter.put("/:id", (req, res) => res.send({ title: "update user by ID" }));

userRouter.delete("/:id", (req, res) => res.send({ title: "delter user by ID" }));

export default userRouter;
