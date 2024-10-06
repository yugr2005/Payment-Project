const mongoose = require("mongoose");
const zod = require("zod");

const safeUser = zod.object({
    username : zod.string(),
    email : zod.string().email(),
    password : zod.string().min(8),
})


module.exports = {
    safeUser,

}