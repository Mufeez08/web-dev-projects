import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [statusData, setStatusData] = useState(null);

    const fetchStatus = () => {
        axios.get('http://localhost:3000/github-status')
            .then(response => {
                setStatusData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setStatusData({ error: 'Failed to fetch data' });
            });
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>GitHub Status</h1>
                <button onClick={fetchStatus}>Fetch Status</button>
                <div>
                    {statusData && (
                        <div>
                            <h2>Status: {statusData.status.description}</h2>
                            <ul>
                                {statusData.components.map((component, index) => (
                                    <li key={index}>
                                        {component.name} - {component.status} - {component.description}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </header>
        </div>
    );
}

export default App;
