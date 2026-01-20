const errorMiddleware = (err, req, res, next) => {
   try {
      let error = { ...err };
      error.message = err.message;

      if (err.name === "CastError") {
         const errorMessage = "Resource Not Found";

         error = new Error(errorMessage);
         error.statusCode = 404;
      }

      if (err.code === 11000) {
         const errorMessage = "Duplicate field value entered";
         error = new Error(errorMessage);
         error.statusCode = 400;
      }

      if (err.name === "validationError") {
         const errorMessage = Object.values(err.errors).map((val) => val.message);
         error = new Error(errorMessage.join(", "));
         error.statusCode = 400;
      }

      res.status(error.statusCode || 500).json({ sucess: false, error: error.message || "server error" });
   } catch (error) {
      next(error);
   }
};

export default errorMiddleware;
