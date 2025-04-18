require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS (Allows frontend to communicate with backend)
app.use(cors());

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Database connection setup
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


// Expose API URL to frontend
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';
app.get('/config', (req, res) => {
  res.json({ API_BASE_URL });
});

// Create a new task
app.post('/tasks', async (req, res) => {
  const { taskName, taskDescription, dueDate } = req.body;

  try {
    const [result] = await db.execute(
      'INSERT INTO Tasks (task_name, task_description, due_date) VALUES (?, ?, ?)',
      [taskName, taskDescription || null, dueDate || null]
    );

    res.status(201).json({ message: 'Task created successfully', taskId: result.insertId });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Could not create task' });
  }
});

// Get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const [tasks] = await db.query('SELECT * FROM Tasks');
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error getting tasks:', error);
    res.status(500).json({ error: 'Could not fetch tasks' });
  }
});

// Get a task by ID
app.get('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [task] = await db.query('SELECT * FROM Tasks WHERE id = ?', [id]);
    if (task.length > 0) {
      res.status(200).json(task[0]);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    console.error('Error getting task:', error);
    res.status(500).json({ error: 'Could not fetch task' });
  }
});

// Update a task
app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { taskName, taskDescription, dueDate, completed } = req.body;

  try {
    const query = `
      UPDATE Tasks 
      SET task_name = COALESCE(?, task_name), 
          task_description = COALESCE(?, task_description), 
          due_date = COALESCE(?, due_date), 
          completed = COALESCE(?, completed)
      WHERE id = ?
    `;

    const [result] = await db.execute(query, [
      taskName || null, 
      taskDescription || null, 
      dueDate || null, 
      completed !== undefined ? (completed ? 1 : 0) : null, 
      id
    ]);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Task updated successfully' });
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Could not update task' });
  }
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.execute('DELETE FROM Tasks WHERE id = ?', [id]);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Task deleted successfully' });
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Could not delete task' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
