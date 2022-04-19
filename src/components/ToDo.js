import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CheckBox from "./CheckBox/CheckBox";

export default function Inputs() {
  const [task, setTask] = useState("");
  const [myDate, setMyDate] = useState(null);
  const [isCompleted] = useState(false);
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || {}
  );
  const [selectedId, setSelectedId] = useState();
  const [isClickedInKey, setIsClickedInKey] = useState(false);

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
            <input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="text-2xl shadow-xl text-gray-500 text-center p-2 border outline-none placeholder-gray-300"
              placeholder="Enter your task..."
            />
          </div>

          <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <div className="flex justify-center">
                <ToggleButtonGroup exclusive sx={{ display: "block" }} />
                <DatePicker
                  clearable
                  value={myDate}
                  onChange={(newDate) =>
                    setMyDate(newDate ? newDate.toLocaleDateString() : null)
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
            </LocalizationProvider>
          </div>
          <button
            onClick={addNewItem}
            className="ml-2 text-2xl pr-10 pl-10 pt-2 pb-3 shadow-xl text-gray-500 border transition hover:bg-blue-400"
          >
            Save
          </button>
        </div>
        <div className="flex justify-center pb-5 ">
          <div className="shadow-xl border-2 mt-10 bg-slate-600 overflow-x-auto h-96">
            {Object.keys(items).map((key) => {
              return (
                <ul key={key} className="">
                  <li className="flex pl-48 pr-48 mb-2 mt-2">
                    <button
                      style={{ display: isClickedInKey ? "none" : "block" }}
                      onClick={() => handleItems(key)}
                      className="text-white text-3xl pr-10 pl-10 pt-2 pb-3 shadow-xl text-gray-500 border transition hover:bg-blue-400"
                    >
                      {key}
                    </button>
                  </li>
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
                            <button>
                              <BorderColorIcon className="text-blue-400 hover:text-blue-700" />
                            </button>

                            <button
                              onClick={() => handleDelete(key, item.id)}
                              className="ml-2 pr-2"
                            >
                              <DeleteIcon className="text-red-400 hover:text-red-700" />
                            </button>
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
              <button
                onClick={changeClickedValue}
                className="pr-5 pl-5 font-bold pt-2 pb-2 shadow-xl text-gray-500 border transition hover:bg-blue-400"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
