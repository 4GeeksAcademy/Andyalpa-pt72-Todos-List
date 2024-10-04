import React, { useState } from "react";

const TodoForm = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState(""); 
  const [showDelete, setShowDelete] = useState(null)
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if(task.trim() !== "")
    setTasks([...tasks, task])
    setTask('')
  };

  console.log(tasks);
  console.log(task);
  

  const handleRemove = (index) => {
    setTasks(tasks.filter((_ , i) => i !== index))
  };

  

  return (
    <form className="todos-card" onSubmit={handleSubmit}>
      <div className="header pt-3 fs-3 fw-bold">
        <h2>Todos:</h2>
      </div>
      <div className="body bg-light h-75 fs-2">
        <ul className="tasks m-2 pt-4 list-group" >
          <input
            placeholder="Add a new task"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="task list-group-item"
            type="text"
          />
          {tasks.map((task, index) => (
            <li onMouseEnter={() => setShowDelete(index)}
            onMouseLeave={() => setShowDelete(null)} className="task list-group-item d-flex justify-content-between" key={index}>
              {task}
              {showDelete === index && <button className="btn btn-danger" onClick={() => handleRemove(index)}>
                X
              </button>}
            </li>
          ))}
        </ul>
      </div>
      <div className="footer ps-5">{tasks.length} tasks left</div>
    </form>
  );
};

export default TodoForm;