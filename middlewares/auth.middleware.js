import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";

const authorize = async (req, res, next) => {
   try {
      let token;

      // Check for token in Authorization header
      if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
         //it seperate bearer and token by space
         //and give us the token part
         token = req.headers.authorization.split(" ")[1];
      }

      // Check if token is not present
      if (!token) {
         return res.status(401).json({
            message: "unauthorized, token is missing",
         });
      }

      const decoded = jwt.verify(token, JWT_SECRET);

      const user = await User.findById({ _id: decoded.userId });

      if (!user) {
         return res.status(401).json({
            message: "user is not found",
         });
      }

      //attach user to the req object
      req.user = user;

      next();
   } catch (error) {
      return res.status(401).json({
         message: "unauthorized, token is invalid",
         error: error?.message,
      });
   }
};

export default authorize;
