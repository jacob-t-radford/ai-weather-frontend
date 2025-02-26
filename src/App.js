import React, { useState } from "react";

const BACKEND_URL = "https://aiweather.duckdns.org/test"; // Flask API URL

const App = () => {
    const [response, setResponse] = useState("");
    const [command, setCommand] = useState(
        "/home/ubuntu/anaconda3/envs/aiweather/bin/ai-models-gfs --input gfs --date 20240201 --time 1200 --assets /home/ubuntu/fcnv2 fourcastnetv2-small"
    );

    const handleButtonClick = () => {
        fetch(BACKEND_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ command })  // Send command to backend
        })
            .then(res => res.json())
            .then(data => setResponse(data.message))
            .catch(error => setResponse("Error connecting to Flask API"));
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>AI Weather Model</h1>
            <textarea
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                rows="4"
                cols="50"
                style={{ marginBottom: "20px" }}
            />
            <br />
            <button onClick={handleButtonClick} style={{ fontSize: "20px", padding: "10px 20px" }}>
                Submit AI Model Command
            </button>
            <p>{response}</p>
        </div>
    );
};

export default App;

