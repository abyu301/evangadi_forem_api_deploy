
const express = require("express");
const Router = express.Router();

const { getAnswerForQuestion, postAnswer } = require("../controller/answerController");
const authMiddleware = require("../middleware/authMiddleware");

Router.post("/:questionid/answers", authMiddleware, postAnswer)
Router.get("/:questionid",  getAnswerForQuestion);


module.exports = Router;

