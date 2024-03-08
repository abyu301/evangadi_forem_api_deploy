const express = require("express");
const Router = express.Router();

const { postQuestion } = require("../controller/questionController");
const { getAllQuestions} = require("../controller/questionController");
const { singleQuestion } = require("../controller/questionController");
const authMiddleware = require("../middleware/authMiddleware");

Router.get("/all-questions",  getAllQuestions);
Router.post("/add-questions",  postQuestion);
Router.get("/:questionid",  singleQuestion);

module.exports = Router;
