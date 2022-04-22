import React, { useEffect, useState } from "react";
import TaskInput from "./Inputs/TaskInput";
import DateInput from "./Inputs/DateInput";
import TextField from "@mui/material/TextField";
import SaveItemsInStorage from "./Buttons/SaveItemsInStroge";
import { v4 as uuidv4 } from "uuid";
import ReferanceToTasks from "./Buttons/ReferanceToTasks";
import DeleteTask from "./Buttons/DeleteTask";
import ChangeTask from "./Buttons/ChangeTask";
import TasksToReferance from "./Buttons/TasksToReferance";
import CheckBox from "./CheckBox/CheckBox";

const ToDo = () => {
  const [task, setTask] = useState("");
  const [myDate, setMyDate] = useState(null);
  const [isCompleted] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [isClickedInKey, setIsClickedInKey] = useState(false);
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || {}
  );

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const addNewItem = () => {
    if (task && myDate) {
      const newItem = {
        task,
        id: uuidv4(),
        isCompleted: isCompleted,
      };
      if (items[myDate]) {
        setItems((prevState) => ({
          ...prevState,
          [myDate]: [...prevState[myDate], { ...newItem }],
        }));
      } else {
        setItems((prevState) => ({ ...prevState, [myDate]: [{ ...newItem }] }));
      }
    } else {
      alert("Enter something...");
    }

    setTask("");
    setMyDate(null);
  };

  const handleItems = (id) => {
    setSelectedId(id);
    setIsClickedInKey(true);
  };

  const changeClickedValue = () => {
    setIsClickedInKey(false);
  };

  const handleDelete = (date, id) => {
    const updatedTasks = items[date].filter((item) => item.id !== id);

    const updatedItems = { ...items };

    if (updatedTasks.length) {
      updatedItems[date] = updatedTasks;
    } else {
      delete updatedItems[date];
      changeClickedValue();
    }
    setItems(updatedItems);
  };

  const handleChecked = (date, id) => {
    const checkedItem = items[date].find((el) => el.id === id);
    const updateItems = { ...items };
    if (!checkedItem.isCompleted) {
      updateItems[date].find((el) => el.id === id).isCompleted = true;
    } else {
      updateItems[date].find((el) => el.id === id).isCompleted = false;
    }
    setItems(updateItems);
  };

  return (
    <div>
      <div>
        <h1 className="flex justify-center text-6xl text-gray-500">
          ToDo List
        </h1>

        <div className="flex justify-center items-center pt-5 ">
          <div className="p-2">
            <TaskInput value={task} onChange={(e) => setTask(e.target.value)} />
          </div>
          <div>
            <DateInput
              clearable
              value={myDate}
              onChange={(newDate) =>
                setMyDate(newDate ? newDate.toLocaleDateString() : null)
              }
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
          <SaveItemsInStorage onClick={addNewItem} />
        </div>
        <div className="flex justify-center pb-5">
          <div className="shadow-xl border-2 mt-10 bg-slate-600 overflow-x-auto h-96">
            {Object.keys(items).map((key) => {
              return (
                <ul key={key}>
                  <ReferanceToTasks
                    style={{ display: isClickedInKey ? "none" : "block" }}
                    onClick={() => handleItems(key)}
                  >
                    {key}
                  </ReferanceToTasks>
                  {selectedId === key && (
                    <div>
                      {items[key].map((item) => (
                        <div className="flex" key={item.id}>
                          <ul className="flex border-b-2 border-gray-400 mt-3">
                            <div
                              style={{
                                display: isClickedInKey ? "block" : "none",
                              }}
                            >
                              <button
                                onClick={() => handleChecked(key, item.id)}
                              >
                                <CheckBox />
                              </button>
                            </div>
                            <li
                              className="ml-8"
                              style={{
                                display: isClickedInKey ? "block" : "none",
                              }}
                            >
                              <p
                                className="text-2xl text-white w-96"
                                style={{
                                  textDecoration: item.isCompleted
                                    ? "line-through"
                                    : "",
                                }}
                              >
                                {item.task}
                              </p>
                            </li>
                          </ul>
                          <div
                            className="ml-5 mt-auto"
                            style={{
                              display: isClickedInKey ? "block" : "none",
                            }}
                          >
                            <ChangeTask />
                            <DeleteTask
                              onClick={() => handleDelete(key, item.id)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ul>
              );
            })}
            <div
              style={{ display: isClickedInKey ? "block" : "none" }}
              className="ml-96 mr-3 mt-10 mb-5"
            >
              <TasksToReferance onClick={changeClickedValue} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDo;
