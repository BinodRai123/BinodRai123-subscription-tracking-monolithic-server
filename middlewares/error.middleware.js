const errorMiddleware = (err, req, res, next) => {
   try {
      // 1. Create a copy of the error object and preserve the original message
      let error = { ...err };
      // Preserve the original error message
      error.message = err.message;

      // ====== mongoose bad object id error ====== //
      //When a MongoDB ID is invalid or formatted incorrectly
      if (err.name === "CastError") {
         const errorMessage = "Resource Not Found";

         error = new Error(errorMessage);
         error.statusCode = 404;
      }

      // ====== mongoose duplicate key error ====== //
      //like if we make email unique and try to register with same email
      if (err.code === 11000) {
         const errorMessage = "Duplicate field value entered";
         error = new Error(errorMessage);
         error.statusCode = 400;
      }

      // ====== mongoose validation error ====== //
      //Example: Required fields missing or too short
      if (err.name === "validationError") {
         const errorMessage = Object.values(err.errors).map((val) => val.message);
         error = new Error(errorMessage.join(", "));
         error.statusCode = 400;
      }

      // ======= sending the response ====== //
      res.status(error.statusCode || 500).json({ sucess: false, error: error.message || "server error" });
   } catch (error) {
      // ======== handling any error that occur in the above code ====== //
      //which help us to prevent server crash
      next(error);
   }
};

export default errorMiddleware;
