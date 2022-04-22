import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const DeleteTask = (props) => {
  return (
    <button {...props} className="ml-2 pr-2">
      <DeleteIcon className="text-red-400 hover:text-red-700" />
    </button>
  );
};

export default DeleteTask;
