import React from "react";
import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function CheckBox() {
  return (
    <div>
      <Checkbox
        {...label}
        sx={{
          "& .MuiSvgIcon-root": { fontSize: 28 },
        }}
      />
    </div>
  );
}
