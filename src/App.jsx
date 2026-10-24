import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [
      { id: 1, text: 'Learn React basics', completed: false },
      { id: 2, text: 'Build my first application', completed: true }
    ];
  });
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input.trim(), completed: false }]);
    setInput('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Active') return !task.completed;
    if (filter === 'Completed') return task.completed;
    return true;
  });

  const activeCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="app-container">
      <div className="header-icon">✓</div>
      <h1>My Tasks</h1>
      <p className="subtitle">Plan your day. Make progress.</p>

      <div className="card">
        <form onSubmit={addTask} className="input-group">
          <input
            type="text"
            placeholder="What do you need to do?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">+ Add</button>
        </form>

        <div className="status-row">
          <span>{activeCount} remaining</span>
          <span>{completedCount} completed</span>
        </div>

        <div className="filter-buttons">
          {['All', 'Active', 'Completed'].map(f => (
            <button
              key={f}
              className={filter === f ? 'active' : ''}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <ul className="task-list">
          {filteredTasks.map(task => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <span className="task-text">{task.text}</span>
              </label>
              <button className="delete-btn" onClick={() => deleteTask(task.id)}>×</button>
            </li>
          ))}
        </ul>

        <div className="card-footer">
          <span>{tasks.length} total tasks</span>
          <button className="clear-btn" onClick={clearCompleted}>Clear completed</button>
        </div>
      </div>

      <p className="footer-note">Small steps every day lead to big results.</p>
    </div>
  );
}

export default App;