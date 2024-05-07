import request from "request";
import express from "express";
import fetch from 'node-fetch';
import cors from "cors";
const app = express();
const port = 3000;
app.use(cors({origin:"*"}));
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("hello world");
});

app.get('/github-status', async (req, res) => {
    try {
        // Fetch data using node-fetch and await the response
        const response = await fetch('https://www.githubstatus.com/',{ headers: { 'Accept': 'application/json' }});
        if (!response.ok) { // Check if response was successful
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        const body = await response.json();

        // Mapping logic remains the same
        const result = {
            status: body.status,
            components: body.components.map(component => ({
                name: component.name,
                status: component.status,
                description: component.description
            }))
        };

        // Send the structured result back to the client
        res.send(result);
    } catch (error) {
        // Handle errors such as network issues or JSON parsing problems
        console.error('Error:', error);
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});