const mongoose = require("mongoose");
const url = process.env.DB_URL;
mongoose.connect(url)
.then(() => {console.log("Db connected.")})
.catch((err) => {
    console.log(err);
})

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})

const accountSchema = new mongoose.Schema({
    username : {
        ref : "users",
        type : String,
        required : true,
    },
    balance : {
        type : Number,
        required : true,
    },
})

const users = mongoose.model("users", userSchema);
const account = mongoose.model("accounts", accountSchema);

module.exports = {
    users,
    account
}
