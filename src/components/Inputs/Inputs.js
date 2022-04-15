import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { el } from "date-fns/locale";

export default function Inputs() {
  const [task, setTask] = useState("");
  const [myDate, setMyDate] = useState("");
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );
  const [selectedId, setSelectedId] = useState();
  const [isClickedInKey, setIsClickedInKey] = useState(false);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const newItem = () => {
    if (task !== "" && myDate !== "") {
      const newItem = {
        id: uuidv4(),
        value: [{ task: task, id: uuidv4() }],
        key: myDate,
      };
      if (items.find((el) => el.key === myDate)) {
        items.find((el) => el.key === myDate).value.push(newItem.value[0]);
        setItems((items) => [...items]);
      } else {
        setItems((items) => [...items, newItem]);
      }
      setTask("");
      setMyDate("");
    } else {
      alert("Enter something...");
      setTask("");
      setMyDate("");
    }
  };

  const handleItems = (id) => {
    setSelectedId(id);
    setIsClickedInKey(true);
  };
  const changeClickedValue = () => {
    setIsClickedInKey(false);
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
              onChange={(e) => setTask(e.target.value)}
              className="text-2xl shadow-xl text-gray-500 text-center p-2 border outline-none placeholder-gray-300"
              placeholder="Enter your task..."
            ></input>
          </div>

          <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <div className="flex justify-center">
                <ToggleButtonGroup
                  exclusive
                  sx={{ display: "block" }}
                ></ToggleButtonGroup>
                <DatePicker
                  value={myDate}
                  onChange={(newDate) =>
                    setMyDate(newDate.toLocaleDateString())
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
            </LocalizationProvider>
          </div>
          <button
            onClick={newItem}
            className="ml-2 text-2xl pr-10 pl-10 pt-2 pb-3 shadow-xl text-gray-500 border transition hover:bg-blue-400"
          >
            Save
          </button>
        </div>
        <div className="flex justify-center pb-5 ">
          <div className="shadow-xl border-2 mt-10 ml-96 mr-96 bg-slate-600 overflow-x-auto h-96">
            {items.map((el) => {
              return (
                <ul key={el.id} className="">
                  <li className="flex pl-48 pr-48 mb-2 mt-2">
                    <button
                      style={{ display: isClickedInKey ? "none" : "block" }}
                      onClick={() => handleItems(el.id)}
                      className="text-white text-3xl pr-10 pl-10 pt-2 pb-3 shadow-xl text-gray-500 border transition hover:bg-blue-400"
                    >
                      {el.key}
                    </button>
                  </li>
                  {selectedId === el.id && (
                    <div>
                      {el.value.map((item) => {
                        return (
                          <div key={item.id}>
                            <ul>
                              <li
                                className="text-2xl border-b-2 p-2 pl-10 font-bold
                            text-white"
                                style={{
                                  display: isClickedInKey ? "block" : "none",
                                }}
                              >
                                {item.task}
                                <span className="flex justify-end">
                                  <button>
                                    <BorderColorIcon className="text-blue-400 hover:text-blue-700" />
                                  </button>

                                  <button className="ml-3">
                                    <DeleteIcon className="text-red-400 hover:text-red-700" />
                                  </button>
                                </span>
                              </li>
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </ul>
              );
            })}
            <div
              style={{ display: isClickedInKey ? "block" : "none" }}
              className="ml-60"
            >
              <button
                onClick={changeClickedValue}
                className="text-1xl pr-10 pl-10 font-bold pt-2 pb-2 shadow-xl text-gray-500 border transition hover:bg-blue-400"
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
