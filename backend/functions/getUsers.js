const { users } = require("../db");

async function getUser(req,res){

    const {search} = req.body;

    const response = await users.find({username : {"$regex": search, "$options": "i"}});

    console.log(response);

    if (response.length === 0) {
        return res.status(404).json({ 
            msg: "No users found" 
        });
    }

    res.json({
        users : response.map(user => ({
            username : user.username,
            id : user._id
        }))
    })

}

module.exports = getUser;