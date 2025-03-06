import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

// Define types for KPI Data
interface KPIData {
    tokensPerMinute: { [key: string]: number };
}

// Read or Initialize the JSON file
const jsonFilePath = path.join(__dirname, 'token_kpi.json');

// Ensure the file exists
if (!fs.existsSync(jsonFilePath)) {
    fs.writeFileSync(jsonFilePath, JSON.stringify({ tokensPerMinute: {} }, null, 2));
}

// Function to read JSON safely
const readJSON = (): KPIData => {
    try {
        return JSON.parse(fs.readFileSync(jsonFilePath, 'utf8')) as KPIData;
    } catch (error) {
        console.error("Error reading JSON file:", error);
        return { tokensPerMinute: {} };
    }
};

// Function to generate random data every minute
const generateRandomData = () => {
    const now = new Date();
    const timestampMinute = now.toISOString().slice(0, 16); // YYYY-MM-DDTHH:MM

    const kpiData = readJSON();

    // Generate a random token count (between 1 and 20)
    const newTokens = Math.floor(Math.random() * 20) + 1;

    // Store new data in JSON file
    kpiData.tokensPerMinute[timestampMinute] = newTokens;

    // Save updated data back to JSON file
    fs.writeFileSync(jsonFilePath, JSON.stringify(kpiData, null, 2));
    console.log(`✅ Generated new token data: ${timestampMinute} → ${newTokens}`);
};

// Run data generation every 1 minute
setInterval(generateRandomData, 60000);

// Initialize Express App
const app = express();
const port = 4000;
app.use(cors());

// API for Grafana to fetch KPI data
app.get('/api/kpi', (req, res) => {
    const kpiData = readJSON();

    // Convert to Grafana-friendly format (array of objects)
    const formattedData = Object.entries(kpiData.tokensPerMinute).map(([timestamp, value]) => ({
        time: new Date(timestamp).toISOString(),  // Ensure valid ISO format
        value: Number(value)  // Convert to numeric
    }));

    res.json(formattedData);
});

// Start Express Server
app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
    console.log(`✅ API for Grafana available at http://localhost:${port}/api/kpi`);
});
