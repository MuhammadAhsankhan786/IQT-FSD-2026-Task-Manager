const express = require("express");
const router = express.Router();

const {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} = require("../controllers/taskController");

const {
    validateTaskId,
    validateCreateTask,
    validateUpdateTask
} = require("../middleware/validation");

// GET /api/tasks - Fetch all tasks
router.get("/", getTasks);

// POST /api/tasks - Create a task
router.post("/", validateCreateTask, createTask);

// PUT /api/tasks/:id - Update an existing task
router.put("/:id", validateTaskId, validateUpdateTask, updateTask);

// DELETE /api/tasks/:id - Delete a task
router.delete("/:id", validateTaskId, deleteTask);

module.exports = router;