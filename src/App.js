import { useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState('')
  const [tasksArray, setTasksArray] = useState([
    { task: "Tidy up bedroom" },
    { task: "Store winter clothes" },
    { task: "Take the dog for a walk" },
    { task: "Water the flowers" },
  ]);

  function updateList(e) {
    setTasksArray(tasksArray.concat({ task: e.target.value }));
    console.log(tasksArray);
    setInputValue('')
  }
  function deleteTask(e) {
    setTasksArray(
      tasksArray.filter((_, i) => {
        console.log(i,typeof e.target.name);
        return e.target.name != i
      })
    );
    console.log(tasksArray, e.target.name);
  }
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
              onChange={(event) => {setInputValue(event.target.value)}}
              onKeyDown={(event) => {
                if ((event.key === "Enter" || event.key === "NumpadEnter") && event.target.value!=="") {
                  updateList(event);
                }
              }}
            />
          </div>
          <div>
            <ul>
              {tasksArray.map((item, i) => {
                return (
                  <li key={i} className="taskLi">
                    {item.task}
                    <div className="deleteButton">
                    <button
                      
                      name={i}
                      onClick={(e) => deleteTask(e)}
                      id={i}
                    >
                      X
                    </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="taskCounter">{tasksArray.length} tasks remaining</div>
        </div>
      </div>
    </div>
  );
}

export default App;
