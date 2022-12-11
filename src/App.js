import "./App.css";
import TableComponent from "./components/TableComponent";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { formatDate } from "./utils/formatDate";
import { useGetDataSearchQuery } from "./Services/dataApi";
import DateComponent from "./components/DateComponent";

function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div className="App">
      <header className="App-header">
        <h3>Analytics</h3>
        <DateComponent
          name="start"
          startDate={{ startDate }}
          setDate={setStartDate}
        />
        <DateComponent name="end" endDate={{ endDate }} setDate={setEndDate} />
        <TableComponent searchQuery={{ startDate, endDate }} />
      </header>
    </div>
  );
}

export default App;
