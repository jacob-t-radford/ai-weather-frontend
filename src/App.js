import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl p-6 w-96 space-y-4">
                <h1 className="text-lg font-semibold text-gray-700 text-center">Weather Model Selection</h1>

                {/* Model Selection Dropdown */}
                <div>
                    <label className="block text-sm font-medium text-gray-600">Select Model</label>
                    <select
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="mt-1 block w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        {models.map((model) => (
                            <option key={model} value={model}>
                                {model}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Date Picker */}
                <div>
                    <label className="block text-sm font-medium text-gray-600">Select Date</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="yyyy-MM-dd"
                        className="mt-1 block w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* Time Selection Dropdown */}
                <div>
                    <label className="block text-sm font-medium text-gray-600">Select Time</label>
                    <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="mt-1 block w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
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

