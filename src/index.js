import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>AI Weather Model</h1>
            <p>Welcome to the AI Weather Frontend!</p>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

