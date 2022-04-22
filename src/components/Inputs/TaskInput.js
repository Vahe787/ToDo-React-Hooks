import React from "react";

const TaskInput = (props) => {
  return (
    <input
      className="text-2xl shadow-xl text-gray-500 text-center p-2 border outline-none placeholder-gray-300"
      placeholder="Enter your task..."
      {...props}
    />
  );
};

export default TaskInput;
