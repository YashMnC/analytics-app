import React from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

export default function DateComponent(props) {
  const handleDateChange = (date) => {
    props.setDate(date);
  };

  return props.name === "start" ? (
    <div style={{ marginBottom: "1.5rem" }}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          label="Start Date"
          value={props.startDate.startDate}
          onChange={handleDateChange}
        />
      </MuiPickersUtilsProvider>
    </div>
  ) : (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          label="End Date"
          value={props.endDate.endDate}
          onChange={handleDateChange}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
}
