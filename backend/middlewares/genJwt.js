const jwt = require("jsonwebtoken");
const jwtpass = process.env.JWT_PASS;

function genJwt(person) {

   return jwt.sign({username : person.username}, jwtpass);
}

module.exports = genJwt;