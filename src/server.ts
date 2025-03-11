// import express from 'express';
// import cors from 'cors';
// import client from 'prom-client';
// import fs from 'fs';
// import path from 'path';
//
// // Define types for KPI Data
// interface KPIData {
//     tokensPerMinute: { [key: string]: number };
//     tokensPerHour: { [key: string]: number };
//     tokensPerDay: { [key: string]: number };
//     passingPercentage: string;
//     notPassingPercentage: string;
// }
//
// // Read the JSON file and cast it to KPIData type
// const jsonFilePath = path.join(__dirname, 'token_kpi.json');
// // Ensure JSON file always has valid content
// let kpiData: KPIData;
//
// try {
//     const fileContent = fs.readFileSync(jsonFilePath, 'utf8');
//     kpiData = fileContent ? JSON.parse(fileContent) : { tokensPerMinute: {}, tokensPerHour: {}, tokensPerDay: {}, passingPercentage: "0", notPassingPercentage: "0" };
// } catch (error) {
//     console.error("⚠️ JSON file is empty or corrupted. Initializing default structure.");
//     kpiData = { tokensPerMinute: {}, tokensPerHour: {}, tokensPerDay: {}, passingPercentage: "0", notPassingPercentage: "0" };
//
//     // Save default data to prevent future errors
//     fs.writeFileSync(jsonFilePath, JSON.stringify(kpiData, null, 2));
// }
//
//
// const app = express();
// const port = 4000;
// app.use(cors());
//
// // Prometheus Registry
// const register = new client.Registry();
// client.collectDefaultMetrics({ register });
//
// const tokensPerMinute = new client.Counter({
//     name: 'tokens_per_minute_total',
//     help: 'Total number of tokens identified per minute',
// });
//
// const tokensPerHour = new client.Gauge({
//     name: 'tokens_per_hour',
//     help: 'Number of tokens identified per hour'
// });
// const tokensPerDay = new client.Gauge({
//     name: 'tokens_per_day',
//     help: 'Number of tokens identified per day'
// });
// const passingPercentage = new client.Gauge({
//     name: 'passing_percentage',
//     help: 'Percentage of tokens passing filters'
// });
// const notPassingPercentage = new client.Gauge({
//     name: 'not_passing_percentage',
//     help: 'Percentage of tokens not passing filters'
// });
//
// // Register Metrics
// register.registerMetric(tokensPerMinute);
// register.registerMetric(tokensPerHour);
// register.registerMetric(tokensPerDay);
// register.registerMetric(passingPercentage);
// register.registerMetric(notPassingPercentage);
//
// // ✅ Ensure Prometheus sees the metric at startup
// tokensPerMinute.inc(0);
//
// const updateMetrics = () => {
//     const now = new Date();
//     const timestampMinute: string = now.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:MM"
//
//     // ✅ Ensure tokensPerMinute exists
//     if (!kpiData.tokensPerMinute) {
//         kpiData.tokensPerMinute = {};
//     }
//
//     // Generate random token count
//     const newTokens: number = Math.floor(Math.random() * 10) + 1;
//
//     // ✅ Load last known counter value safely
//     const lastTotal = kpiData.tokensPerMinute[timestampMinute] || 0;
//     kpiData.tokensPerMinute[timestampMinute] = lastTotal + newTokens;
//
//     // ✅ Save back to JSON file
//     fs.writeFileSync(jsonFilePath, JSON.stringify(kpiData, null, 2));
//
//     console.log(`✅ Updated: ${timestampMinute} → +${newTokens}, Total: ${kpiData.tokensPerMinute[timestampMinute]}`);
// };
//
// // Run update every 1 minute
// setInterval(updateMetrics, 60000);
//
// // ✅ Convert JSON format for Grafana API
// app.get('/api/kpi', (req, res) => {
//     const formattedData = {
//         tokensPerMinute: Object.entries(kpiData.tokensPerMinute || {}).map(([timestamp, tokens]) => ({
//             timestamp,
//             tokens
//         })),
//         tokensPerHour: Object.entries(kpiData.tokensPerHour || {}).map(([timestamp, tokens]) => ({
//             timestamp,
//             tokens
//         })),
//         tokensPerDay: Object.entries(kpiData.tokensPerDay || {}).map(([timestamp, tokens]) => ({
//             timestamp,
//             tokens
//         }))
//     };
//
//     res.json(formattedData);
// });
//
// // Prometheus Metrics Endpoint
// app.get('/metrics', async (req, res) => {
//     res.setHeader('Content-Type', register.contentType);
//     res.send(await register.metrics());
// });
//
// // Start Server
// app.listen(port, '0.0.0.0', () => {
//     console.log(`✅ Server running at http://localhost:${port}`);
//     console.log(`✅ Metrics available at http://localhost:${port}/metrics`);
// });



/////////////////////////////**************************//////////////////////////////////

// import express from 'express';
// import cors from 'cors';
// import client from 'prom-client';
// import fs from 'fs';
// import path from 'path';
//
// // Define types for KPI Data
// interface KPIData {
//     tokensPerMinute: { [key: string]: number };
//     tokensPerHour: { [key: string]: number };
//     tokensPerDay: { [key: string]: number };
//     passingPercentage: string;
//     notPassingPercentage: string;
// }
//
// // Read the JSON file and cast it to KPIData type
// const jsonFilePath = path.join(__dirname, 'token_kpi.json');
// let kpiData: KPIData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
//
// const app = express();
// const port = 4000;
// app.use(cors());
//
// // Prometheus Registry
// const register = new client.Registry();
// client.collectDefaultMetrics({ register });
//
// const tokensPerMinute = new client.Counter({
//     name: 'tokens_per_minute_total',  // ✅ Change name
//     help: 'Total number of tokens identified per minute',
// });
//
//
// // Define Prometheus Metrics (Counter for per-minute, Gauge for others)
// // const tokensPerMinute = new client.Counter({
// //     name: 'tokens_per_minute',
// //     help: 'Total number of tokens identified per minute'
// // });
// const tokensPerHour = new client.Gauge({
//     name: 'tokens_per_hour',
//     help: 'Number of tokens identified per hour'
// });
// const tokensPerDay = new client.Gauge({
//     name: 'tokens_per_day',
//     help: 'Number of tokens identified per day'
// });
// const passingPercentage = new client.Gauge({
//     name: 'passing_percentage',
//     help: 'Percentage of tokens passing filters'
// });
// const notPassingPercentage = new client.Gauge({
//     name: 'not_passing_percentage',
//     help: 'Percentage of tokens not passing filters'
// });
//
// // Register Metrics
// register.registerMetric(tokensPerMinute);
// register.registerMetric(tokensPerHour);
// register.registerMetric(tokensPerDay);
// register.registerMetric(passingPercentage);
// register.registerMetric(notPassingPercentage);
//
// // ✅ Ensure Prometheus sees the metric at startup
// tokensPerMinute.inc(0);
//
// // Function to update JSON and Prometheus Metrics
// // const updateMetrics = () => {
// //     const now = new Date();
// //
// //     // Generate timestamp keys
// //     const timestampMinute: string = now.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:MM"
// //     const timestampHour: string = now.toISOString().slice(0, 13);   // "YYYY-MM-DDTHH"
// //     const timestampDay: string = now.toISOString().slice(0, 10);    // "YYYY-MM-DD"
// //
// //     // Generate random token count for this example
// //     const newTokens: number = Math.floor(Math.random() * 10) + 1;
// //
// //     // Ensure objects exist before updating
// //     if (!kpiData.tokensPerMinute) kpiData.tokensPerMinute = {};
// //     if (!kpiData.tokensPerHour) kpiData.tokensPerHour = {};
// //     if (!kpiData.tokensPerDay) kpiData.tokensPerDay = {};
// //
// //     // ✅ Fix: Accumulate values instead of replacing them
// //     const lastTokens = kpiData.tokensPerMinute[timestampMinute] || 0;
// //     kpiData.tokensPerMinute[timestampMinute] = lastTokens + newTokens;
// //
// //     // ✅ Fix: Ensure Prometheus Counter always increases
// //     tokensPerMinute.inc(newTokens);
// //
// //     // ✅ Update tokensPerHour and tokensPerDay based on accumulation
// //     kpiData.tokensPerHour[timestampHour] = Object.values(kpiData.tokensPerMinute)
// //         .reduce((sum, value) => sum + value, 0);
// //     kpiData.tokensPerDay[timestampDay] = Object.values(kpiData.tokensPerMinute)
// //         .reduce((sum, value) => sum + value, 0);
// //
// //     // ✅ Update Prometheus Gauges with latest aggregated values
// //     tokensPerHour.set(kpiData.tokensPerHour[timestampHour]);
// //     tokensPerDay.set(kpiData.tokensPerDay[timestampDay]);
// //     passingPercentage.set(parseFloat(kpiData.passingPercentage || '0'));
// //     notPassingPercentage.set(parseFloat(kpiData.notPassingPercentage || '0'));
// //
// //     // ✅ Save Updated Data Back to JSON
// //     fs.writeFileSync(jsonFilePath, JSON.stringify(kpiData, null, 2));
// //
// //     // ✅ Log updates for debugging
// //     console.log(`✅ Updated: ${timestampMinute} → +${newTokens}, Total: ${kpiData.tokensPerMinute[timestampMinute]}`);
// // };
//
// const updateMetrics = () => {
//     const now = new Date();
//     const timestampMinute: string = now.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:MM"
//
//     // Generate random token count
//     const newTokens: number = Math.floor(Math.random() * 10) + 1;
//
//     // Load last known counter value (fixes reset issue)
//     // const lastTotal = kpiData.tokensPerMinute[timestampMinute] || 0;
//
//     if (!kpiData.tokensPerMinute) {
//         kpiData.tokensPerMinute = {}; // ✅ Initialize if undefined
//     }
//
//     const lastTotal = kpiData.tokensPerMinute[timestampMinute] || 0;
//
//
//     kpiData.tokensPerMinute[timestampMinute] = lastTotal + newTokens;
//
//     // ✅ Persist counter value across scrapes
//     fs.writeFileSync(jsonFilePath, JSON.stringify(kpiData, null, 2));
//
//     // ✅ Ensure Prometheus sees increments
//     tokensPerMinute.inc(newTokens);
//
//     console.log(`✅ Updated: ${timestampMinute} → +${newTokens}, Total: ${kpiData.tokensPerMinute[timestampMinute]}`);
// };
//
//
//
// // Run update every 1 minute
// setInterval(updateMetrics, 60000);
//
// // // API Endpoint to Get KPI Data
// // app.get('/api/kpi', (req, res) => {
// //     res.json(kpiData);
// // });
//
// // ✅ Convert JSON format for Grafana API
// app.get('/api/kpi', (req, res) => {
//     const formattedData = {
//         tokensPerMinute: Object.entries(kpiData.tokensPerMinute).map(([timestamp, tokens]) => ({
//             timestamp,
//             tokens
//         })),
//         tokensPerHour: Object.entries(kpiData.tokensPerHour).map(([timestamp, tokens]) => ({
//             timestamp,
//             tokens
//         })),
//         tokensPerDay: Object.entries(kpiData.tokensPerDay).map(([timestamp, tokens]) => ({
//             timestamp,
//             tokens
//         }))
//     };
//
//     res.json(formattedData);
// });
//
//
// // Prometheus Metrics Endpoint
// // app.get('/metrics', async (req, res) => {
// //     res.set('Content-Type', register.contentType);
// //     res.end(await register.metrics());
// // });
//
// app.get('/metrics', async (req, res) => {
//     res.setHeader('Content-Type', register.contentType);
//     res.send(await register.metrics());  // Changed `.end()` to `.send()`
// });
//
//
// // Start Server
// app.listen(port, '0.0.0.0', () => {
//     console.log(`✅ Server running at http://localhost:${port}`);
//     console.log(`✅ Metrics available at http://localhost:${port}/metrics`);
// });
//
//



//
//
// ////////////////////////////********************************///////////////
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
    const newTokens = Math.floor(Math.random() * 100) + 1;
    // const newTokens = Math.floor(Math.random() * 20) + 1;

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
