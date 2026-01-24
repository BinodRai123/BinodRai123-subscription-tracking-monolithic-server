import dayjs from "dayjs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const { serve } = require("@upstash/workflow/express");
import Subscription from "../models/subscription.model.js";

//define reminder days before renewal
const REMINDERS = [7, 5, 2, 1];

export const sendReminders = serve(async (context) => {
   const { subscriptionId } = context.requestPayload; // Destructure directly

   // Always use context.run for DB queries
   const subscription = await fetchSubscription(context, subscriptionId);

   // Fix: Check for string "active"
   if (!subscription || subscription.status !== "active") return;

   const renewalDate = dayjs(subscription.renewalDate);

   // Optimization: Wrap logic that depends on 'current time' in a run block
   // if it's used for flow control
   if (renewalDate.isBefore(dayjs())) {
      console.log(`Renewal date passed for ${subscriptionId}.`);
      return;
   }

   for (const daysBefore of REMINDERS) {
      const reminderDate = renewalDate.subtract(daysBefore, "day");

      // Use .isAfter(dayjs()) to see if the reminder date is in the future
      if (reminderDate.isAfter(dayjs())) {
         await sleepUntilReminder(context, `reminder-${daysBefore}-days`, reminderDate);
      }

      // This should only trigger AFTER the sleep
      await triggerReminder(context, `reminder-${daysBefore}-days`);
   }
});

const fetchSubscription = async (context, subscriptionId) => {
   //context.run ensures idempotency by caching the result
   return await context.run("get subscription", () => {
      //populate means to fetch user details along with subscription
      return Subscription.findById(subscriptionId).populate("user", "name email").lean();
   });
};

//sleepuntilreminder pauses the workflow until the specified date
const sleepUntilReminder = async (context, label, date) => {
   console.log(`sleeping until ${label} reminder at ${date}`);
   await context.sleepUntil(label, date.toDate());
};

//triggerReminder simulates sending a reminder
const triggerReminder = async (context, label) => {
   return await context.run(label, () => {
      console.log(`trigerring ${label} reminder`);
   });
};
