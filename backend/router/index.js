const express = require("express");
const signup = require("../functions/signup");
const login = require("../functions/login");
const getBalance = require("../functions/getBalance");
const auth = require("../middlewares/auth");
const transfer = require("../functions/transfer");
const router = express.Router(); 

//Users
router.post("/signup", signup);
router.post("/login", login);

//Account
router.get("/getBalance", auth, getBalance);
router.post("/transfer/:id", auth, transfer);


module.exports = router;