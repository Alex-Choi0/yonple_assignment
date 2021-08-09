import * as bcrypt from 'bcrypt';
import { errcodeThrow } from 'src/function/errThrow';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/users.entity';
import { createToken } from '../function/token/tokenFun';
require('dotenv').config()

// User entity를 불러서 DB의 테이블 생성
@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async signupUser(email : string, nickname : string, password : string): Promise <string>{

    const user = new User();
    const emailValidation = await this.findOne({email});

    if(emailValidation) errcodeThrow("1-1");

    user.password = bcrypt.hashSync(password, Number(process.env.SALT_ROUND));
    user.email = email;
    user.nickname = nickname;
    await this.insert(user);

    return "OK";

  }

  async signinUser(email : string, password : string): Promise <{token:string, user:object}> {

    const found = await this.findOne({email});
    console.log("found : ", found);
    if(found && !bcrypt.compareSync(password, found.password)) errcodeThrow("2-2");

    else if(!found) errcodeThrow("2-1");

    const token = createToken({email, nickname: found.nickname, userId : found.id});

    delete found.password;

    return {
      token,
      user: found
    };
  }

}
