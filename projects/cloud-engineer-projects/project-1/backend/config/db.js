require("dotenv").config();
const mysql = require("mysql2/promise");

// Create a Promise that resolves with the database connection
const dbPromise = mysql.createConnection({
    host: process.env.RDS_HOSTNAME || process.env.DB_HOST,
    user: process.env.RDS_USERNAME || process.env.DB_USER,
    password: process.env.RDS_PASSWORD || process.env.DB_PASSWORD,
    database: process.env.RDS_DB_NAME || process.env.DB_NAME,
    port: process.env.RDS_PORT || process.env.DB_PORT || 3306,
})
.then(connection => {
    console.log("✅ Connected to MySQL Database");
    return connection;
})
.catch(err => {
    console.error("❌ Error connecting to MySQL:", err);
    process.exit(1);
});

module.exports = dbPromise;