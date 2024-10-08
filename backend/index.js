require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db")
const mainRouter = require("./router/index")
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/user", mainRouter);

app.get('/', (req,res) => {
    res.send("Hello Krisha")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})