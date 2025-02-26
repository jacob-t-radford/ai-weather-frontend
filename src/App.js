import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css"; // ✅ Import the separate CSS file

const BACKEND_URL = "https://aiweather.duckdns.org/test"; // Flask API URL

const App = () => {
    const [selectedModel, setSelectedModel] = useState("FourCastNetv2-small");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState("00Z");

    const models = [
        "FourCastNetv2-small",
        "Pangu-Weather",
        "GraphCast",
        "GraphCast-1p00",
        "Aurora-2.5-finetuned",
    ];
    const times = ["00Z", "06Z", "12Z", "18Z"];

    return (
        <div className="container">
            <div className="card">
                <h1 className="title">Weather Model Selection</h1>

                {/* Model Selection Dropdown */}
                <div className="input-group">
                    <label>Select Model</label>
                    <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
                        {models.map((model) => (
                            <option key={model} value={model}>
                                {model}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Date Picker */}
                <div className="input-group">
                    <label>Select Date</label>
                    <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} dateFormat="yyyy-MM-dd" />
                </div>

                {/* Time Selection Dropdown */}
                <div className="input-group">
                    <label>Select Time</label>
                    <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
                        {times.map((time) => (
                            <option key={time} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default App;

