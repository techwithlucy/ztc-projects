const Todo = require("../../models/todo");

const getTodos = async (req, res) => {
    try {
        // Use a Promise-based approach instead of callbacks
        const results = await new Promise((resolve, reject) => {
            Todo.getAll((err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        res.status(200).json({ success: true, data: results });
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({ success: false, error: "Failed to fetch todos" });
    }
};

module.exports = getTodos;