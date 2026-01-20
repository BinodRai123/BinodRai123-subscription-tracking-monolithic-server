import express from "express";
import { PORT } from "./config/env.js";

const app = express(); //enabled the server

app.get("/", (req, res) => {
   res.status(200).json({ message: "hello from backend" });
});

app.listen(PORT, () => {
   console.log(`server is running on port: ${PORT}`);
});
