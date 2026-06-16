const mongoose = require("mongoose");

// Validate that the ID parameter is a valid MongoDB ObjectId
const validateTaskId = (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: "Invalid Task ID format",
            message: `The provided ID '${id}' is not a valid MongoDB ObjectId.`
        });
    }
    next();
};

// Validate request body for creating a task
const validateCreateTask = (req, res, next) => {
    const { title } = req.body;
    
    if (title === undefined || title === null) {
        return res.status(400).json({
            error: "Bad Request",
            message: "The 'title' field is required."
        });
    }

    if (typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({
            error: "Bad Request",
            message: "The 'title' field must be a non-empty string."
        });
    }

    // Sanitize title by trimming it
    req.body.title = title.trim();
    next();
};

// Validate request body for updating a task
const validateUpdateTask = (req, res, next) => {
    const { title, completed } = req.body;

    // Title is optional for update, but if provided, it must be a non-empty string
    if (title !== undefined) {
        if (typeof title !== "string" || title.trim() === "") {
            return res.status(400).json({
                error: "Bad Request",
                message: "The 'title' field must be a non-empty string if provided."
            });
        }
        req.body.title = title.trim();
    }

    // Completed is optional, but if provided, must be a boolean
    if (completed !== undefined) {
        if (typeof completed !== "boolean") {
            return res.status(400).json({
                error: "Bad Request",
                message: "The 'completed' field must be a boolean value if provided."
            });
        }
    }

    next();
};

module.exports = {
    validateTaskId,
    validateCreateTask,
    validateUpdateTask
};
