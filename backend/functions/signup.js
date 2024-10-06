const { users, account } = require("../db");
const genJwt = require("../middlewares/genJwt");
const { safeUser } = require("../type");
const bcrypt = require("bcrypt");

async function signup(req, res) {

    const person = req.body;
    const safeperson = safeUser.safeParse(person);

    if(!safeperson){
        res.status(411).json({
            msg : "Invalid inputs"
        })
        return;
    }

    const existingUser = await users.findOne({username : person.username});

    if(existingUser){
        res.status(411).json({
            msg : "Username already taken"
        })
        return;
    }

    const hashed = await bcrypt.hash(person.password, 10);

    await users.create({
        username : person.username,
        email : person.email,
        password : hashed,
    })

    const token = await genJwt(person);

    const amount =  Math.floor(Math.random() * 500);

    await account.create({
        username : person.username,
        balance : amount,
    })

    res.json({
        msg : "User created",
        token : token
    })

}

module.exports = signup;