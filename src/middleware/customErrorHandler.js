export const ErrorHandler = (err, req, res, next) => {
     const statusCode = err.status || 500;
     const message = err.message || "Something went wrong";

     res.status(statusCode).json({
        success:false,
        message,
        ...(err.error && ({error: err.error}))
     });
};