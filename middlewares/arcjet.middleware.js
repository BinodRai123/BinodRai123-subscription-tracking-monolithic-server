import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
   try {
      //we says protect the req and tell me the decision
      const decision = await aj.protect(req, { requested: 1 });

      //if decision is denied we block the request
      if (decision.isDenied()) {
         if (decision.reason.isRateLimit()) return res.status(429).json({ error: " Rate limit Exceeded " });

         if (decision.reason.isBot()) return res.status(403).json({ error: "bot detected" });

         return res.status(403).json({ error: "access denied" });
      }

      //if decision is allowed we let the request pass
      next();
   } catch (error) {
      console.log(`arcjet middleware error : ${error?.message}`);
      next(error);
   }
};

export default arcjetMiddleware;
