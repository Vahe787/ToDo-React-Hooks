import React from "react";

const SaveItemsInStorge = (props) => {
  return (
    <button
      {...props}
      className="ml-2 text-2xl pr-10 pl-10 pt-2 pb-3 shadow-xl text-gray-500 border transition hover:bg-blue-400"
    >
      Save
    </button>
  );
};

export default SaveItemsInStorge;
