import React, { useState, useEffect } from "react";


const TodoForm = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [showDelete, setShowDelete] = useState(null);
  const [id, setId] = useState(0);
  const [addUser, setAddUser] = useState("");

  
  useEffect(() => {
    async function checkUser() {
      let res = await fetch('https://playground.4geeks.com/todo/users/Andyalpa')
      let data = await res.json()
      if(data.detail !== "User Andyalpa doesn't experiments.") {
        setAddUser(data);
        setTasks(data.todos)
      } else {
        let res = await fetch('https://playground.4geeks.com/todo/users/Andyalpa', {
          method: "POST",
          headers: { "Content-type": "application/json" },
        })
        let data = await res.json()
        console.log(data);
        
      }
    }
    checkUser()
  }, [])

  useEffect(() => {
    async function addTask() {
      // updato post
      let res = await fetch('https://playground.4geeks.com/todo/todos/Andyalpa', {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({label: task, is_done: false})
      });
      if (!res.ok) {
        throw new Error("Network was not ok")
      }
      let data = await res.json();
      setTasks([...tasks, data]);
      setTask(""); 
    }

    if(task !== "" && task.length > 0) {
      addTask()
    }
  }, [tasks])


  
    async function removeTaskid(id) {
      let res = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
        method: "DELETE",
        headers: { "Content-type": "application/json" }
        });
        if (!res.ok) {
          throw new Error("Delete was not ok")
        }
        let data = await res.json()
        setTasks(data)
      }
      
    

 
  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.trim() !== "") {
      const newTask = { label: task, id: id, is_done: false };      
       
      setTasks([...tasks, newTask]);
      setId(prevId => prevId + 1);
    }
  };

  const handleRemove = (index) => {
    const taskToDelete = tasks[index];
    removeTaskid(taskToDelete.id);
    setTasks(tasks.filter((_, i) => i !== index));
    
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
           {tasks?.map((task, index) => (
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
