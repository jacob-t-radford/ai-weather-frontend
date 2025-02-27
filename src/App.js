import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css"; // ✅ Import the separate CSS file

const BACKEND_URL = "https://aiweather.duckdns.org/test"; // Flask API URL

const App = () => {
    const [selectedModel, setSelectedModel] = useState("GraphCast");
    const [selectedDate, setSelectedDate] = useState(new Date());
	const [selectedUTCDate, setSelectedUTCDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState("00Z");
    const [selectedInit, setSelectedInit] = useState("GFS");
    const [selectedMember, setSelectedMember] = useState("All"); // Default to "All"
    const [latestChecked, setLatestChecked] = useState(true); // ✅ Default checked

    const models = [
		"GraphCast",
        "FourCastNetv2-small",
        "Pangu-Weather",
        "GraphCast-1p00",
        "Aurora-2.5-finetuned",
    ];
    const ics = ["GFS", "GEFS", "GDAS"];
    const times = ["00Z", "06Z", "12Z", "18Z"];

    // ✅ Add "All" as the first option in the member list
    const members = ["All", ...Array.from({ length: 31 }, (_, i) => i.toString())];

	const getNearest6HourInterval = (hours) => {
		const nearest6Hour = Math.floor(hours / 6) * 6;
		const formattedTime = nearest6Hour.toString().padStart(2, '0') + "Z";
		return formattedTime;
	};

	const dateSet = (date) => {
        const UTCYear = date.getUTCFullYear()
        const UTCMonth = date.getUTCMonth()
        const UTCDay = date.getUTCDate()
        const UTCHour = date.getUTCHours()
		const timestr = getNearest6HourInterval(UTCHour)
		setSelectedDate(new Date(UTCYear,UTCMonth,UTCDay))
		setSelectedTime(timestr)
	};

	const formatDateRequest = (date) => {
		const reqYear = date.getUTCFullYear().toString()
		const reqMonth = (date.getUTCMonth() + 1).toString().padStart(2, '0')
		const reqDay = date.getUTCDate().toString().padStart(2, '0')
		const fullDate = reqYear + reqMonth + reqDay
		return fullDate
	}

	const formatTimeRequest = (time) => {
		const reqTime = time.replace("Z","00")
		return reqTime
	}

	const handleLatestChecked = (latestChecked) => {
		dateSet(new Date())
		setLatestChecked(!latestChecked)
	}

    // ✅ Function that logs selected values to the console

	const handleSubmit = async () => {
		// Format the date and time properly
		const formattedDate = formatDateRequest(selectedDate);
		const formattedTime = formatTimeRequest(selectedTime);

		// Create the request payload
		const requestData = {
			model: selectedModel,
			init: selectedInit,
			date: formattedDate,
			time: formattedTime,
			member: selectedInit === "GEFS" ? selectedMember : undefined, // Include member only if GEFS
		};

		console.log("Sending Request Data:", requestData);

		try {
			const response = await fetch(`${BACKEND_URL}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestData),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();
			console.log("API Response:", data);
		} catch (error) {
			console.error("Error sending request:", error);
		}
	};


	useEffect(() => {
		dateSet(new Date())
	}, []);

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

                {/* Initial Condition Selection Dropdown */}
                <div className="input-group">
                    <label>Select Initial Conditions</label>
                    <select
                        value={selectedInit}
                        onChange={(e) => {
                            setSelectedInit(e.target.value);
                            if (e.target.value !== "GEFS") setSelectedMember("All"); // Reset member if not GEFS
                        }}
                    >
                        <option value="">Select an option</option> {/* Default empty option */}
                        {ics.map((ic) => (
                            <option key={ic} value={ic}>
                                {ic}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Member Selection Dropdown (Only Visible if GEFS is Selected) */}
                {selectedInit === "GEFS" && (
                    <div className="input-group">
                        <label>Select Member</label>
                        <select value={selectedMember} onChange={(e) => setSelectedMember(e.target.value)}>
                            {members.map((member) => (
                                <option key={member} value={member}>
                                    {member}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

				<div className="latest-checkbox">
					<input
						type="checkbox"
						id="latest"
						checked={latestChecked}
						onChange={() => handleLatestChecked(latestChecked)}
					/>
					<label htmlFor="latest">Latest</label>
				</div>

                {/* Date Picker and Latest Checkbox Inline */}
                <div className="input-group">
					<label>Select Date</label>
					<DatePicker
						selected={selectedDate}
						onChange={(date) => setSelectedDate(date)}
						dateFormat="yyyy-MM-dd"
						disabled={latestChecked} // ✅ Disables if "Latest" is checked
					/>
                </div>

                {/* Time Selection Dropdown */}
                <div className="input-group">
                    <label>Select Time</label>
                    <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} disabled={latestChecked}>
                        {times.map((time) => (
                            <option key={time} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>
                </div>

                {/* ✅ Submit Button */}
                <button className="submit-button" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default App;

