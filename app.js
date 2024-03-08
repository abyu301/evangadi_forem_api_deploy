require("dotenv").config();

const express = require("express");
const app = express();
const port = 5500;

const cors = require("cors");

app.use(cors());

// db connection
const dbConnection = require("./db/dbConfige");

// middleware files
const userRoutes = require("./routes/userRoute");
const questionsRoutes = require("./routes/questionRoute");
const answersRoutes = require("./routes/answerRoute");



// json middleware to extract json data
app.use(express.json());

// user routes middleware
app.use("/api/users", userRoutes);

// questions routes middleware 
app.use("/api/questions", questionsRoutes);

// answers routes middleware
app.use("/api/answers", answersRoutes);

async function start() {
  try {
    const result = await dbConnection.execute("select 'test' ");
    await app.listen(port);
    console.log(`listing on ${port}`);
  } catch (error) {
    console.log(error.message);
  }
}
start();
