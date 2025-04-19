require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const API_VERSION = process.env.API_V1 || "v1";

// ROUTE IMPORTS
// In your main index.js
const todoRoutes = require("./routes/todo/index.js");

// APP SETTINGS
app.use(express.json());

// Configure CORS to allow requests from your frontend domain
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Health Check Route
app.get("/healthcheck", (req, res) => {
    res.status(200).send("ok");
});

// Todo Routes
app.use(`/api/${API_VERSION}/todo`, todoRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});