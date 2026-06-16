const Task = require("../models/Task");

/**
 * @desc    Get all tasks
 * @route   GET /api/tasks
 * @access  Public
 */
const getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Create a new task
 * @route   POST /api/tasks
 * @access  Public
 */
const createTask = async (req, res, next) => {
    try {
        const { title } = req.body;
        const newTask = await Task.create({ title });
        res.status(201).json(newTask);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update a task (by ID)
 * @route   PUT /api/tasks/:id
 * @access  Public
 */
const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({
                error: "Not Found",
                message: `Task with ID '${id}' not found.`
            });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete a task (by ID)
 * @route   DELETE /api/tasks/:id
 * @access  Public
 */
const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({
                error: "Not Found",
                message: `Task with ID '${id}' not found.`
            });
        }

        res.status(200).json({
            success: true,
            message: "Task successfully deleted",
            task: deletedTask
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};
