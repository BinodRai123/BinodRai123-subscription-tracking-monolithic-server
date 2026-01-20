import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, "subscription name is required"],
         unique: true,
         minLength: 5,
         maxLength: 100,
         trim: true,
      },
      price: {
         type: Number,
         required: [true, "price should be given"],
         min: [0, "price must be greater than 0"],
         max: [1000, "price must be less than 1000"],
      },
      currency: {
         type: String,
         required: [true, "currency must be given "],
         enum: ["USD", "RS", "EUR"],
         default: "NEP",
      },
      frequency: {
         type: String,
         enum: ["daily", "weekly", "monthly", "yearly"],
      },
      category: {
         type: String,
         enum: ["sports", "news", "entertainment", "lifestyle", "finance", "other"],
      },
      paymentMethod: {
         type: String,
         required: [true, "paymentMethod Must be given"],
         trim: true,
      },
      status: {
         type: String,
         enum: ["active", "cancel", "expired"],
         default: "active",
      },
      startDate: {
         type: Date,
         required: [true, "start Date must be given"],
         validate: {
            //check if start date is less or not
            validator: (value) => value <= new Date(),
            //if not give this error message
            message: " start date must be in the past",
         },
      },
      renewalDate: {
         type: Date,
         validate: {
            //check if renewal date is after start date
            validator: function (value) {
               return value > this.startDate;
            },
            //if not give this error message
            message: "renewal date must be after the start date",
         },
      },
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "user",
         required: true,
         index: true,
      },
   },
   { timestamps: true },
);

subscriptionSchema.pre("save", function (next) {
   //Auto-calculate renewal date if not provided
   if (!this.renewalDate) {
      const renewalPeriods = {
         daily: 1,
         weekly: 7,
         monthly: 30,
         yearly: 365,
      };

      //create a new date object based on startDate
      //so that we don't modify the original startDate
      this.renewalDate = new Date(this.startDate);

      // Add the appropriate number of days based on frequency
      this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
   }

   //Auto-update the status if renewal date is passed
   if (this.renewalDate < new Date()) {
      this.status = "expired";
   }

   next();
});

const Subscription = mongoose.model("subscription", subscriptionSchema);

export default Subscription;
