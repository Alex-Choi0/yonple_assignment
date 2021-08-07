import { HttpException, HttpStatus } from "@nestjs/common";

const jwt = require("jsonwebtoken");
require('dotenv').config()

export const createToken = (payload : object) : string => {
        const tokenValue = jwt.sign(payload, process.env.SALT, {expiresIn : process.env.EXPIRESIN});
        return tokenValue;
}

export const checkToken = (token : string) : {email: string, nickname: string, userId: number} => {
        try{
                const decode = jwt.verify(token, process.env.SALT);
                return {email: decode.email, nickname: decode.nickname, userId: decode.userId};
        }
        catch(error){
                throw new HttpException(error.message, HttpStatus.NOT_ACCEPTABLE)
        }






}
