import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [tasksArray, setTasksArray] = useState([]);
  const [remainingTasks, setRemainingTasks] = useState("")
  function readTasksAPI() {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/t0liguemi", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((resp) => {
        if(resp.status==200){
        return resp.json();
      }})
      .then((data) => {
        setTasksArray(data);
        setRemainingTasks(tasksArray.length>1?tasksArray.length+" tasks remaining":tasksArray[0].done==false?tasksArray.length+" task remaining":"No tasks remaining")
      })
      .catch((error) => {
        console.log("error :" + error);
      });
  }
  function updateTasksAPI(arr) {
    console.log("current" + arr);
    fetch("https://playground.4geeks.com/apis/fake/todos/user/t0liguemi", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(arr),
    })
      .then((resp) => {
        if (resp.status === 200) {
          readTasksAPI();

          console.log(resp.status); // the status code = 200 or code = 400 etc.
        }
      })
      .catch((error) => {
        console.log("error :" + error);
      });
  }
  function updateList(e) {
    if (tasksArray[0].done) {
      console.log(tasksArray[0]);
      updateTasksAPI([{ label: e.target.value, done: false }]);
    } else {
      updateTasksAPI([...tasksArray, { label: e.target.value, done: false }]);
    }
    setInputValue("");
  }
  function deleteTask(e) {
    if (tasksArray.length > 1) {
      updateTasksAPI(
        tasksArray.filter((task) => {
          return e.target.id != task.id;
        })
      );
    } else {
      updateTasksAPI([{ label: "No tasks added", done: true }]);
    }
  }
  function emptyTasks(){
    updateTasksAPI([{ label: "No tasks added", done: true }])
  }
  useEffect(() => readTasksAPI(),[tasksArray]);
  return (
    <div className="App">
      <div className="container">
        <span>todos</span>
        <div className="taskBox">
          <div>
            <input
              type="text"
              className="taskInput"
              name="taskInput"
              placeholder="What needs to be done?"
              value={inputValue}
              onChange={(event) => {
                setInputValue(event.target.value);
              }}
              onKeyDown={(event) => {
                if (
                  (event.key === "Enter" || event.key === "NumpadEnter") &&
                  event.target.value !== ""
                ) {
                  updateList(event);
                }
              }}
            />
          </div>
          <div>
            <ul>
              {tasksArray.map((item) => {
                return (
                  <li key={item.id} className="taskLi">
                    {item.label}
                    <div className="deleteButton">
                      <button
                        name={item.id}
                        onClick={(e) => deleteTask(e)}
                        id={item.id}
                      >
                        X
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="taskCounter">{remainingTasks}</div>
        </div>
        <button id="clearButton" onClick={()=>emptyTasks()}>Clear todo list</button>
      </div>
    </div>
  );
}

export default App;
