import React from "react";

const NewTaskInput = (props) => {
  return (
    <input
      {...props}
      className="shadow-xl text-gray-500 text-center p-2 border outline-none placeholder-gray-300"
      placeholder="Change your task..."
    />
  );
};

export default NewTaskInput;
