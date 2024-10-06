const { account } = require("../db");

async function getBalance(req, res){

    const username = req.username;
    

    const findUser = await account.findOne({username : username});

    if(!findUser){
        res.status(411).json({
            msg : "Invalid user"
        })
        return;
    }

    res.json({
        balance : findUser.balance
    })
}

module.exports = getBalance;