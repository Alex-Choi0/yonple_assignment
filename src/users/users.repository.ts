import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { createToken } from '../function/token/tokenFun';
import { User } from './users.entity';
require('dotenv').config()

// User entity를 불러서 DB의 테이블 생성
@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async signupUser(email : string, nickname : string, password : string): Promise <string>{

    const user = new User();
    const emailValidation = await this.findOne({email});

    if(emailValidation){
      // 회원가입 에러처리 1 : 해당 이메일이 이미 존재할 경우(403)
      throw new HttpException('해당 이메일은 이미 존재합니다.', HttpStatus.FORBIDDEN);
    }

    user.password = bcrypt.hashSync(password, Number(process.env.SALT_ROUND));
    user.email = email;
    user.nickname = nickname;
    await this.insert(user);

    return "OK";

  }

  async signinUser(email : string, password : string): Promise <object> {

    const user = new User();
    const found = await this.findOne({email});
    if(found){

      if(!bcrypt.compareSync(password, found.password)){
        // 로그인 에러처리 2 : 비밀번호가 틀렸을 경우(403)
        throw new HttpException('해당 비밀번호가 틀렸습니다.', HttpStatus.FORBIDDEN);
      }
    }

    else{
      // 로그인 에러처리 1 : 존재하지 않는 이메일일 경우(403)
      throw new HttpException('해당 이메일은 존재하지 않습니다.', HttpStatus.FORBIDDEN);
    }

    const token = createToken({email, nickname: found.nickname});

    delete found.password;

    return {
      token,
      user: found
    };
  }

}
