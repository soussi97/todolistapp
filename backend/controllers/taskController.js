// controllers/taskController.js


// @desc    Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new task
// @desc    Create a new task
exports.createTask = async (req, res) => {
  try {
      console.log('Received Task Data:', req.body); // Log received data
      const { title, description, startDate, dueDate } = req.body;
      const newTask = new Task({
          title,
          description,
          startDate,
          dueDate,
      });
      const task = await newTask.save();
      res.status(201).json(task);
  } catch (err) {
      console.error('Error creating task:', err);
      res.status(500).json({ message: 'Server Error' });
  }
};


// @desc    Update a task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const { title, description, startDate, dueDate, status } = req.body;

    task.title = title || task.title;
    task.description = description || task.description;
    task.startDate = startDate || task.startDate;
    task.dueDate = dueDate || task.dueDate;
    task.status = status || task.status;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.remove();
    res.json({ message: 'Task removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
