const dbConnection = require("../db/dbConfige");
const { StatusCodes } = require("http-status-codes");


async function postAnswer(req, res) {
    const { answer, answerCodeBlock } = req.body;
    const usersid = req.user ? req.user.usersid : null;
    const questionid = req.params.questionid; 

    
    if (!answer) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Missing required fields" });
    }

    try {
        await dbConnection.query(
            "INSERT INTO answertable (answer,answerCodeBlock, usersid, questionid) VALUES (?, ?, ?, ?)",
            [answer,answerCodeBlock, usersid, questionid]
        );
        return res.status(StatusCodes.CREATED).json({ msg: "Answer posted successfully" });
    } catch (error) {
        console.error(error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong, try again" });
    }
}


    






async function getAnswerForQuestion(req, res) {
    const { questionid } = req.params; 
    try {
        const answers = await dbConnection.query(`
            SELECT a.*, u.username AS username
            FROM answertable a
            INNER JOIN users u ON a.usersid = u.usersid
            WHERE a.questionid = ?
            ORDER BY a.answerid DESC
        `, [questionid]);
    
        res.status(StatusCodes.OK).json({ 
            total: answers[0].length,
            answers: answers[0],
        });
    } catch (error) {
        console.error(error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong while fetching answers" });
    }
    

}


// const postAnswer = async (req, res) => {
//     const questionId = req.params.questionid;
//     console.log("Question ID:", questionId); 

//     try {
//         let questionAndAnswers = await dbConnection.query(`
//             SELECT * 
//             FROM answertable 
//             WHERE questionid = '${questionId}' 
//             ORDER BY answerid DESC
//         `);

//         if (questionAndAnswers[0].length === 0) {
//             console.log("No answers found for question ID:", questionId);
//         }

//         res.status(200).json({
//             status: true,
//             total: questionAndAnswers[0].length,
//             answers: questionAndAnswers[0],
//         });
//     } catch (error) {
//         console.error("Error retrieving answers:", error);
//         return res.status(500).json({ status: false, message: "Internal server error" });
//     }
// }


module.exports = { postAnswer,  getAnswerForQuestion};
