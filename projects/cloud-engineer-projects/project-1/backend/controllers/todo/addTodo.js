const Todo = require("../../models/todo");

const addTodo = (req, res) => {
    try {
        const { task } = req.body;
        
        if (!task) {
            return res.status(400).json({ success: false, error: "Task is required" });
        }
        
        // Use the create method from your Todo model with callback
        Todo.create(task, (err, result) => {
            if (err) {
                console.error("Error adding todo:", err);
                return res.status(500).json({ success: false, error: "Failed to add todo" });
            }
            
            // Return the newly created todo
            return res.status(201).json({
                success: true,
                data: {
                    id: result.insertId,
                    title: task,
                    completed: false
                }
            });
        });
    } catch (error) {
        console.error("Error in addTodo controller:", error);
        res.status(500).json({ success: false, error: "Failed to add todo" });
    }
};

module.exports = addTodo;