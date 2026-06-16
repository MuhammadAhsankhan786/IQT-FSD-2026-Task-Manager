// Global Error Handler Middleware
const errorHandler = (err, req, res, next) => {
    console.error("Error encountered:", err.stack || err);

    // Mongoose validation error
    if (err.name === "ValidationError") {
        const messages = Object.values(err.errors).map((val) => val.message);
        return res.status(400).json({
            error: "Validation Error",
            message: messages.join(", ")
        });
    }

    // Mongoose duplicate key error (e.g. unique field violations)
    if (err.code && err.code === 11000) {
        return res.status(409).json({
            error: "Conflict Error",
            message: "A duplicate field value was entered."
        });
    }

    // Cast error (e.g., malformed Mongoose ObjectId query that bypassed initial validation)
    if (err.name === "CastError") {
        return res.status(400).json({
            error: "Resource Not Found",
            message: `Invalid format for field ${err.path}: ${err.value}`
        });
    }

    // General default error
    const statusCode = err.statusCode || 500;
    const message = err.message || "An unexpected internal server error occurred.";

    res.status(statusCode).json({
        error: err.name || "Internal Server Error",
        message: message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
};

module.exports = errorHandler;
