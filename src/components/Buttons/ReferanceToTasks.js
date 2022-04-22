import React from "react";

const ReferanceToTasks = (props) => {
  return (
    <li className="flex pl-48 pr-48 mb-2 mt-2">
      <button
        {...props}
        className="text-white text-3xl pr-10 pl-10 pt-2 pb-3 shadow-xl text-gray-500 border transition hover:bg-blue-400"
      >
        {props.children}
      </button>
    </li>
  );
};

export default ReferanceToTasks;
