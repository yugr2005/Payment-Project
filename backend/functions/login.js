const { users } = require("../db");
const bcrypt = require("bcrypt");
const genJwt = require("../middlewares/genJwt");

async function login(req, res){

    const person = req.body;

    const findPerson = await users.findOne({username : person.username});

    if(!findPerson){
        res.status(404).json({
            msg : "User not exists"
        })
        return;
    }

    const checkPass = await bcrypt.compare(person.password, findPerson.password);

    if(!checkPass){
        res.status(411).json({
            msg : "Invalid Password"
        })
        return;
    }

    const token = genJwt(person);

    res.json({
        msg : "User Logged-in",
        token : token,
    })
}

module.exports = login;