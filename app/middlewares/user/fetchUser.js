var jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;


const fetchUser = (req,res,next)=>{
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ success: false, error: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        console.log(data);
        req.user = data;
        next();
    } catch (error) {
        res.status(401).send({ success: false, error: "Please authenticate using a valid token" })
    }
}

module.exports = fetchUser;