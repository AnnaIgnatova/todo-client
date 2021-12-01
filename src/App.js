import React, { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [task, setTask] = useState('');
  const [status, setStatus] = useState('');
  const [tasksList, setTaskList] = useState([]);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    Axios.get('https://todo-mysql-deploy.herokuapp.com/api/get').then(
      (response) => {
        setTaskList(response.data);
      }
    );
  }, []);

  const addTask = () => {
    Axios.post('https://todo-mysql-deploy.herokuapp.com/api/insert', {
      taskName: task,
      statusName: status,
    });

    setTaskList([...tasksList, { task: task, status: status }]);
  };
  
  // todo-mysql-deploy.herokuapp.com

  const deleteTask = (task, e) => {
    Axios.delete(
      `https://todo-mysql-deploy.herokuapp.com/api/delete/${task}`
    ).then((err) => {
      console.log(err);
    });
    e.target.parentNode.parentNode.remove();
  };

  const updateStatus = (task) => {
    Axios.put('https://todo-mysql-deploy.herokuapp.com/api/update', {
      task: task,
      status: newStatus,
    });

    setNewStatus('');
  };

  function renderAllTasks() {
    return (
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
                <input
                  type="text"
                  className="input_update"
                  placeholder={value.status}
                  onChange={(e) => {
                    setNewStatus(e.target.value);
                  }}
                />
              </div>
              <div>
                <button
                  className="btn add_btn"
                  onClick={(e) => {
                    deleteTask(value.task, e);
                  }}
                >
                  Delete
                </button>
                <button
                  className="add_btn"
                  onClick={() => {
                    updateStatus(value.task);
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="App">
      <div className="registration_form">
        <label>User&nbsp;name:</label>
        <input type="text"></input>
        <label>Password:</label>
        <input type="password"></input>
        <div>
          <button className="signIn-btn">Sign In</button>
          <button className="signIn-btn">Sign Up</button>
        </div>
      </div>
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
      {renderAllTasks()}
    </div>
  );
}

export default App;
