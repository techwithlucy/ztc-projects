const dbPromise = require("../config/db"); 

const Todo = {
    getAll: async (callback) => {
        try {
            const db = await dbPromise; // Wait for DB connection
            const [results] = await db.query("SELECT * FROM todos");
            callback(null, results);
        } catch (error) {
            callback(error, null);
        }
    },

    create: async (task, callback) => {
        try {
            const db = await dbPromise;
            const [result] = await db.query("INSERT INTO todos (title) VALUES (?)", [task]);
            callback(null, result);
        } catch (error) {
            callback(error, null);
        }
    }
};

// Ensure table is created
const createTable = async () => {
    try {
        const db = await dbPromise;
        await db.query(`
            CREATE TABLE IF NOT EXISTS todos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                completed BOOLEAN DEFAULT false
            )
        `);
        console.log("✅ 'todos' table created or already exists.");
    } catch (error) {
        console.error("❌ Error creating table:", error);
    }
};

createTable(); // Run the table creation script

module.exports = Todo;