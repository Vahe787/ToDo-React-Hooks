import React from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const ChangeTask = (props) => {
  return (
    <button {...props}>
      <BorderColorIcon className="text-blue-400 hover:text-blue-700" />
    </button>
  );
};

export default ChangeTask;
