// Task Manager App - Main JavaScript

// State management
let tasks = [];
let currentFilter = 'all';

// DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.getElementById('clearCompleted');
const taskCount = document.getElementById('taskCount');

// Initialize app
function init() {
    loadTasks();
    renderTasks();
    attachEventListeners();
}

// Load tasks from storage
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}

// Save tasks to storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add task
function addTask() {
    const text = taskInput.value.trim();
    
    if (text === '') {
        alert('Please enter a task!');
        return;
    }
    
    const task = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    tasks.unshift(task);
    saveTasks();
    renderTasks();
    
    taskInput.value = '';
    taskInput.focus();
}

// Toggle task completion
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

// Delete task
function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
    }
}

// Clear completed tasks
function clearCompleted() {
    const completedCount = tasks.filter(t => t.completed).length;
    
    if (completedCount === 0) {
        alert('No completed tasks to clear!');
        return;
    }
    
    if (confirm(`Delete ${completedCount} completed task(s)?`)) {
        tasks = tasks.filter(t => !t.completed);
        saveTasks();
        renderTasks();
    }
}

// Filter tasks
function setFilter(filter) {
    currentFilter = filter;
    
    // Update active filter button
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        }
    });
    
    renderTasks();
}

// Get filtered tasks
function getFilteredTasks() {
    switch (currentFilter) {
        case 'active':
            return tasks.filter(t => !t.completed);
        case 'completed':
            return tasks.filter(t => t.completed);
        default:
            return tasks;
    }
}

// Render tasks
function renderTasks() {
    const filteredTasks = getFilteredTasks();
    
    // Update task count
    const activeCount = tasks.filter(t => !t.completed).length;
    taskCount.textContent = `${activeCount} task${activeCount !== 1 ? 's' : ''}`;
    
    // Clear task list
    taskList.innerHTML = '';
    
    // Show empty state if no tasks
    if (filteredTasks.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = '<p>No tasks to show! 🎉</p>';
        taskList.appendChild(emptyState);
        return;
    }
    
    // Render each task
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <input 
                type="checkbox" 
                class="task-checkbox" 
                ${task.completed ? 'checked' : ''}
                data-id="${task.id}"
            >
            <span class="task-text">${escapeHtml(task.text)}</span>
            <button class="task-delete" data-id="${task.id}">Delete</button>
        `;
        
        taskList.appendChild(li);
    });
    
    // Attach event listeners to new elements
    attachTaskEventListeners();
}

// Attach task-specific event listeners
function attachTaskEventListeners() {
    // Checkbox listeners
    document.querySelectorAll('.task-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const id = parseInt(e.target.dataset.id);
            toggleTask(id);
        });
    });
    
    // Delete button listeners
    document.querySelectorAll('.task-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            deleteTask(id);
        });
    });
}

// Attach main event listeners
function attachEventListeners() {
    // Add task button
    addTaskBtn.addEventListener('click', addTask);
    
    // Enter key to add task
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            setFilter(e.target.dataset.filter);
        });
    });
    
    // Clear completed button
    clearCompletedBtn.addEventListener('click', clearCompleted);
}

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}