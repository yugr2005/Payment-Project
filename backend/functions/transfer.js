const { account } = require("../db");

async function transfer(req, res){

    const to = req.params.id;
    const from = req.username;
    const {amount} = req.body;

    if(!to || !from || !amount){
        res.status(411).json({
            msg : "Something went wrong"
        })
        return;
    }

    try{

        const fromBalance = await account.findOne({username : from});

    if(amount > fromBalance.balance){
        res.json({
            msg : "Insufficient Balance"
        })
        return;
    }

    await account.updateOne({_id : to}, {$inc : {balance : amount}})
    await account.updateOne({username : from}, {$inc : {balance : -amount}})

    res.json({
        msg : "Transfer Successful"
    })

    }

    catch(err){
        console.log(err)
    }
    
}

module.exports = transfer;