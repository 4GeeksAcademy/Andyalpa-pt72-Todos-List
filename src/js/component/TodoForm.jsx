import React, { useState, useEffect } from "react";

const TodoForm = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [showDelete, setShowDelete] = useState(null);
  const [id, setId] = useState(0);
  const [editIndex, setEditIndex] = useState(null);

  
  useEffect(() => {
    fetch('https://playground.4geeks.com/todo/users/Andyalpa')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data.todos)) {
          setTasks(data.todos);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

 
  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.trim() !== "") {
      const newTask = { label: task, id: id, is_done: false };

      if (editIndex !== null) {
        const updatedTasks = tasks.map((t, index) => 
          index === editIndex ? newTask : t
        );
        setTasks(updatedTasks);
        updateTaskAPI(newTask, editIndex);
        setEditIndex(null);
      } else {
        setTasks([...tasks, newTask]);
        createTaskAPI(newTask);
      }
      setId(prevId => prevId + 1);
      setTask(""); 
    }
  };

  const handleRemove = (index) => {
    const taskToDelete = tasks[index];
    setTasks(tasks.filter((_, i) => i !== index));
    deleteTaskAPI(taskToDelete.id);
  };

  const createTaskAPI = async (task) => {
    try {
      const response = await fetch('https://playground.4geeks.com/todo/users/Andyalpa', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (!response.ok) {
        const errorDetail = await response.json();
        throw new Error(`Error ${response.status}: ${errorDetail.detail}`);
      }

      const data = await response.json();
      console.log("Task Created:", data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateTaskAPI = (task, index) => {
    fetch(`https://playground.4geeks.com/todo/${task.id}`, {
      method: 'PUT',
      body: JSON.stringify(task),
      headers: { "Content-Type": "application/json" },
    })
    .then(res => res.json())
    .then(data => console.log("Task Updated:", data))
    .catch(error => console.error('Error updating task:', error));
  };

  const deleteTaskAPI = (taskId) => {
    fetch(`https://playground.4geeks.com/todo/users/Andyalpa/${taskId}`, {
      method: 'DELETE',
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Delete Failed");
      }
      console.log("Task Deleted");
    })
    .catch((error) => console.error('Delete Error:', error));
  };

  return (
    <form className="todos-card" onSubmit={handleSubmit}>
      <div className="header pt-3 fs-3 fw-bold">
        <h2>Todos:</h2>
      </div>
      <div className="body bg-light h-75 fs-2">
        <ul className="tasks m-2 pt-4 list-group">
          <input
            placeholder="Add a new task"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="task list-group-item"
            type="text"
          />
          {tasks.map((task, index) => (
            <li
              onMouseEnter={() => setShowDelete(index)}
              onMouseLeave={() => setShowDelete(null)}
              className="task list-group-item d-flex justify-content-between"
              key={index}
            >
              {task.label}
              {showDelete === index && (
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemove(index)}
                >
                  X
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="footer ps-5">{tasks.length} tasks left</div>
    </form>
  );
};

export default TodoForm;
