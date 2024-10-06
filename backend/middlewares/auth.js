const jwt = require('jsonwebtoken');
const jwtpass = process.env.JWT_PASS;

async function auth(req, res, next) {

    const token = req.headers.authorization;

    if(!token){
        res.status(411).json({
            msg : "Please log-in"
        })
        return;
    }

    const decode = jwt.verify(token, jwtpass);
    req.username = decode.username;
    next();

}

module.exports = auth;