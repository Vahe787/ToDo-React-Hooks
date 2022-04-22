import React from "react";

const TasksToReferance = (props) => {
  return (
    <button
      {...props}
      className="pr-5 pl-5 font-bold pt-2 pb-2 shadow-xl text-gray-500 border transition hover:bg-blue-400"
    >
      Go Back
    </button>
  );
};

export default TasksToReferance;
