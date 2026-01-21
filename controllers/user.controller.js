import User from "../models/user.model.js";

//Get All Users
export const getUsers = async (req, res, next) => {
   try {
      const users = await User.find().select("-password");

      res.status(200).json({
         sucess: true,
         message: "all users fetch sucessfull",
         data: users,
      });
   } catch (error) {
      next(error);
   }
};

//Get single User
export const getUser = async (req, res, next) => {
   try {
      const user = req.user;

      if (!user) {
         const error = new Error("user doesn't exist");
         error.statusCode = 404;
         throw error;
      }

      res.status(200).json({
         sucess: true,
         data: user,
      });
   } catch (error) {
      next(error);
   }
};
