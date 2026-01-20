import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, "user name is required"],
         trim: true,
         minLength: 2,
         maxLength: 50,
      },
      email: {
         type: String,
         required: [true, "email is required"],
         unique: true,
         trim: true,
         lowercase: true,
         match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "please fill a valid email address"],
      },
      password: {
         type: String,
         required: [true, "password is required"],
         minLength: 6,
         maxLength: 12,
      },
   },
   { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export default User;
