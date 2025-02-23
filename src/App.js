import React, { useState } from "react";

const BACKEND_URL = "https://aiweather.duckdns.org/test"; // Replace with your actual EC2 IP

const App = () => {
    const [response, setResponse] = useState("");

    const handleButtonClick = () => {
        fetch(BACKEND_URL)
            .then(res => res.json())
            .then(data => setResponse(data.message))
            .catch(error => setResponse("Error connecting to Flask API"));
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>AI Weather Model</h1>
            <button onClick={handleButtonClick} style={{ fontSize: "20px", padding: "10px 20px" }}>
                Test Flask API
            </button>
            <p>{response}</p>
        </div>
    );
};

export default App;

