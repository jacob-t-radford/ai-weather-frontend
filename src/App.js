import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BACKEND_URL = "https://aiweather.duckdns.org/test"; // Flask API URL

const App = () => {
    const [selectedModel, setSelectedModel] = useState("FourCastNetv2-small");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState("00Z");

    const models = ["FourCastNetv2-small", "Pangu-Weather", "GraphCast", "Aurora"];
    const times = ["00Z", "06Z", "12Z", "18Z"];

    return (
        <div style={{ display: "flex", gap: "10px", alignItems: "center", margin: "20px" }}>
            {/* Model Selection Dropdown */}
            <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
                {models.map((model) => (
                    <option key={model} value={model}>
                        {model}
                    </option>
                ))}
            </select>

            {/* Date Picker */}
            <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy-MM-dd"
            />

            {/* Time Selection Dropdown */}
            <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
                {times.map((time) => (
                    <option key={time} value={time}>
                        {time}
                    </option>
                ))}
            </select>
        </div>
    );
};
export default App;

