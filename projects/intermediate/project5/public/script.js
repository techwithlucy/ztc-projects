let API_BASE_URL = 'http://localhost:3000'; 

// Get references to DOM elements
const taskForm = document.getElementById('task-form');
const taskNameInput = document.getElementById('task-name');
const taskDueDateInput = document.getElementById('task-due-date');
const taskList = document.getElementById('task-list');

// Fetch API URL from backend
async function loadConfig() {
  try {
    const response = await fetch('/config');
    const config = await response.json();
    API_BASE_URL = config.API_BASE_URL || API_BASE_URL;
    fetchTasks();
  } catch (error) {
    console.error('Error fetching config:', error);
  }
}

// Fetch tasks from the backend API
async function fetchTasks() {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    const tasks = await response.json();
    taskList.innerHTML = '';

    tasks.forEach(task => {
      const formattedDate = task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No due date';
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${task.task_name} - ${formattedDate}</span>
        <button onclick="markAsCompleted(${task.id})">✔</button>
        <button class="delete-btn" onclick="deleteTask(${task.id})">🗑</button>
      `;
      if (task.completed) {
        li.classList.add('completed');
      }
      taskList.appendChild(li);
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}

// Add a new task
taskForm.addEventListener('submit', async function(event) {
  event.preventDefault();

  const taskName = taskNameInput.value.trim();
  const dueDate = taskDueDateInput.value || null;

  if (!taskName) {
    alert('Task name cannot be empty!');
    return;
  }

  try {
    await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskName, dueDate })
    });

    fetchTasks();
    taskNameInput.value = '';
    taskDueDateInput.value = '';
  } catch (error) {
    console.error('Error adding task:', error);
  }
});

// Mark task as completed
async function markAsCompleted(taskId) {
  await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: true })
  });
  fetchTasks();
}

// Delete a task
async function deleteTask(taskId) {
  await fetch(`${API_BASE_URL}/tasks/${taskId}`, { method: 'DELETE' });
  fetchTasks();
}

// Load tasks on page load
window.onload = loadConfig;
