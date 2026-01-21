import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

export const signUp = async (req, res, next) => {
   const session = await mongoose.startSession();
   session.startTransaction();

   try {
      const { name, email, password } = req.body;

      const existingUser = await User.findOne({ email });

      //if user already exits throw error
      if (existingUser) {
         const error = new Error("user already exist");
         error.statusCode = 409;
         throw error;
      }

      //Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      //In here Session help us to give an error
      //If user donot fully submit data or they only submit half Data
      const newUsers = await User.create([{ name, email, password: hashedPassword }], { session });

      const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

      await session.commitTransaction();
      session.endSession();

      res.status(201).json({
         sucess: true,
         message: "user created sucessfully",
         data: {
            token,
            user: newUsers[0],
         },
      });
   } catch (error) {
      await session.abortTransaction();
      session.endSession();
      next(error);
   }
};

export const signIn = async (req, res, next) => {
   try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
         const error = new Error("user not found");
         error.statusCode = 404;
         throw error;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
         const error = new Error("password is invalid");
         error.statusCode = 401;
         throw error;
      }

      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

      res.status(200).json({
         sucess: true,
         message: "sucessfully signin",
         data: {
            token,
            user,
         },
      });
   } catch (error) {
      next(error);
   }
};

export const signOut = async (req, res, next) => {};
