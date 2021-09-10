import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("");
  const [tasksList, setTaskList] = useState([]);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setTaskList(response.data);
    });
  }, []);

  const addTask = () => {
    Axios.post("http://localhost:3001/api/insert", {
      taskName: task,
      statusName: status,
    });

    setTaskList([
      ...tasksList, 
      { task: task, status: status },
    ]);
  };
  // todo-mysql-deploy.herokuapp.com
  const deleteTask = (task) => {
    Axios.delete(`http://localhost:3001/api/delete/${task}`);
  }

  const updateStatus = (task) => {

    Axios.put("http://localhost:3001/api/update", {
      task: task,
      status: newStatus,
    });

    setNewStatus("");
  }

  return (
    <div className="App">
      <h1 className="app_title">To-Do List</h1>
      <div className="task_container">
        <h2 className="task_title">create task</h2>
        <div className="input_wrapper">
          <label>task:</label>
          <input
            type="text"
            onChange={(e) => {
              setTask(e.target.value);
            }}
          />
        </div>
        <div className="input_wrapper">
          <label>status:</label>
          <input
            type="text"
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          />
        </div>
        <button className="add_btn" onClick={addTask}>
          Add
        </button>
      </div>
      <h2 className="all_title">All tasks</h2>
      <div className="all_tasks">
        {tasksList.map((value) => {
          return (
            <div className="task_container">
              <h2 className="task_title">task</h2>
              <div className="input_wrapper">
                <label>task:</label>
                <label className="label_value">{value.task}</label>
              </div>
              <div className="input_wrapper">
                <label>status:</label>
                <input type="text" className="input_update" placeholder={value.status} onChange={(e) => {
                  setNewStatus(e.target.value)
                }}/>
              </div>
              <div>
                <button className="btn add_btn" onClick={() => {deleteTask(value.task)}}>Delete</button>
                <button className="add_btn" onClick={() => {updateStatus(value.task)}}>Update</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
