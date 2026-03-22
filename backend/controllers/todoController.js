const Todo = require("../models/Todo");

// Create Todo
exports.createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const todo = await Todo.create({ title, description });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Todos with Pagination
exports.getTodos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;

    const todos = await Todo.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Todo.countDocuments();

    res.json({
      todos,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Todo
exports.updateTodo = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, status },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Todo
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};