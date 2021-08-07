const jwt = require("jsonwebtoken");
require('dotenv').config()
// import { User } from "../../users/users.entity";

export const createToken = (payload : object) : string => {
        const tokenValue = jwt.sign(payload, process.env.SALT, {expiresIn : process.env.EXPIRESIN});
        return tokenValue;
}

