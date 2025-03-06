// import express from 'express';
// import cors from 'cors';
// import client from 'prom-client';
// import fs from 'fs';
// import path from 'path';
//
// // Define types for KPI Data
// interface KPIData {
//     tokensPerMinute: { [key: string]: number };
// }
//
// // Read the JSON file and cast it to KPIData type
// const jsonFilePath = path.join(__dirname, 'token_kpi.json');
// const kpiData: KPIData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
//
// const app = express();
// const port = 4000;
// app.use(cors());
//
// // Prometheus Registry
// const register = new client.Registry();
// client.collectDefaultMetrics({ register });
//
// // Change from `Gauge` to `Counter`
// const tokensPerMinute = new client.Counter({
//     name: 'tokens_per_minute',
//     help: 'Total number of tokens identified per minute'
// });
//
// // Register Metrics
// register.registerMetric(tokensPerMinute);
//
// // const updateMetrics = () => {
// //     const now = new Date();
// //     const timestampMinute = now.toISOString().slice(0, 16); // YYYY-MM-DDTHH:MM
// //
// //     // Generate random token count
// //     const newTokens = Math.floor(Math.random() * 10) + 1;
// //
// //     // Ensure JSON structure exists
// //     if (!kpiData.tokensPerMinute) kpiData.tokensPerMinute = {};
// //
// //     // Increment token count per minute
// //     kpiData.tokensPerMinute[timestampMinute] = (kpiData.tokensPerMinute[timestampMinute] || 0) + newTokens;
// //
// //     // Increment in Prometheus (fix issue of overwriting)
// //     tokensPerMinute.inc(newTokens);
// //     // Save Updated Data Back to JSON
// //     fs.writeFileSync(jsonFilePath, JSON.stringify(kpiData, null, 2));
// //     console.log(`✅ Updated tokensPerMinute: ${timestampMinute} → +${newTokens}`);
// // };
//
//
// const updateMetrics = () => {
//     const now = new Date();
//     const timestampMinute = now.toISOString().slice(0, 16); // YYYY-MM-DDTHH:MM
//
//     // Generate random token count
//     const newTokens = Math.floor(Math.random() * 10) + 1;
//
//     // Ensure JSON structure exists
//     if (!kpiData.tokensPerMinute) kpiData.tokensPerMinute = {};
//
//     // Increment token count per minute
//     kpiData.tokensPerMinute[timestampMinute] = (kpiData.tokensPerMinute[timestampMinute] || 0) + newTokens;
//
//     console.log(`🔹 Updating tokens_per_minute in Prometheus by +${newTokens}`);
//     tokensPerMinute.inc(newTokens); // This should increment Prometheus Counter
//
//     // Save Updated Data Back to JSON
//     fs.writeFileSync(jsonFilePath, JSON.stringify(kpiData, null, 2));
//     console.log(`✅ Updated tokensPerMinute: ${timestampMinute} → +${newTokens}`);
// };
//
//
//
// // Run update every 1 minute
// setInterval(updateMetrics, 60000);
//
// // API Endpoint to Get KPI Data
// app.get('/api/kpi', (req, res) => {
//     res.json(kpiData);
// });
//
// // Prometheus Metrics Endpoint
// app.get('/metrics', async (req, res) => {
//     res.set('Content-Type', register.contentType);
//     res.end(await register.metrics());
// });
//
// // Start Server
// app.listen(port, () => {
//     console.log(`✅ Server running at http://localhost:${port}`);
//     console.log(`✅ Metrics available at http://localhost:${port}/metrics`);
// });


////////////////////////////////////***************************//////////////////////////////////////////////


import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

// Define types for KPI Data
interface KPIData {
    tokensPerMinute: { [key: string]: number };
    tokensPerHour: { [key: string]: number };
    tokensPerDay: { [key: string]: number };
    passingPercentage: string;
    notPassingPercentage: string;
}

// Read the JSON file
const jsonFilePath = path.join(__dirname, 'token_kpi.json');

const app = express();
const port = 4000;
app.use(cors());

// API to get KPI Data for Grafana
app.get('/api/kpi', (req, res) => {
    const kpiData: KPIData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
    res.json(kpiData);
});

// Start Server
app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
    console.log(`✅ API for Grafana available at http://localhost:${port}/api/kpi`);
});
