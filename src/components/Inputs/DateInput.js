import React from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const DateInput = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="flex justify-center">
        <ToggleButtonGroup exclusive sx={{ display: "block" }} />
        <DatePicker {...props} />
      </div>
    </LocalizationProvider>
  );
};

export default DateInput;
