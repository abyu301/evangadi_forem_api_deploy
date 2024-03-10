const express = require("express");
const Router = express.Router();

const { postQuestion } = require("../controller/questionController");
const { getAllQuestions} = require("../controller/questionController");
const { singleQuestion } = require("../controller/questionController");
const authMiddleware = require("../middleware/authMiddleware");

Router.get("/all-questions",authMiddleware,  getAllQuestions);
Router.post("/add-questions",authMiddleware,  postQuestion);
Router.get("/:questionid",authMiddleware,  singleQuestion);

module.exports = Router;
