const { StatusCodes } = require("http-status-codes");
const dbConnection = require("../db/dbConfige");

async function postQuestion(req, res) {
  const { question, questiondescription, questionCodeBlock, tags } = req.body;

  const usersid = req.user.usersid; 
  const username = req.user.username;

  console.log(username);

  console.log(usersid)
  if (!question) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Missing required fields" });
  }

  try {
    await dbConnection.query("INSERT INTO questions (question, questiondescription, questionCodeBlock, tags, usersid) VALUES (?, ?, ?, ?, ?)", [
      question, questiondescription, questionCodeBlock, tags, usersid, username
    ]);
    return res.status(StatusCodes.CREATED).json({ msg: "Question posted successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong, try again" });
  }
}

const getAllQuestions = async (req, res) => {
  try {
    const questions = await dbConnection.query(`
      SELECT q.*, u.firstname AS username
      FROM questions q
      JOIN users u ON q.usersid = u.usersid
      ORDER BY q.questionid DESC
    `);
    res.status(StatusCodes.OK).json({ 
      total: questions[0].length,
      questions: questions[0],
    });
  } catch (error) {
    console.error(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong while fetching questions" });
  }
  
}



const singleQuestion = async (req, res) => {
  const questionid = req.params.questionid;

  try {
    let question = await dbConnection.query(`
        SELECT q.*, u.firstname AS username
        FROM questions q
        JOIN users u ON q.usersid = u.usersid
        WHERE q.questionid = '${questionid}'
    `);
    res.status(StatusCodes.OK).json(question[0][0]);
} catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong while fetching the question" });
}

}



module.exports = { postQuestion, getAllQuestions, singleQuestion };
