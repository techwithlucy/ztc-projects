// routes/todo/index.js
const express = require("express");
const router = express.Router();
const addTodo = require("../../controllers/todo/addTodo");
const getTodos = require("../../controllers/todo/getTodos");

router.post('/', addTodo);
router.get('/', getTodos);

module.exports = router;