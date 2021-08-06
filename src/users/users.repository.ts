import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './users.entity';
require('dotenv').config()

// User entity를 불러서 DB의 테이블 생성
@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async signupUser(email : string, nickname : string, password : string){

    const user = new User();
    const emailValidation = await this.findOne({email});

    if(emailValidation){
      throw new HttpException('해당 이메일은 이미 존재합니다.', HttpStatus.FORBIDDEN);
    }

    user.password = bcrypt.hashSync(password, Number(process.env.SALT_ROUND));
    user.email = email;
    user.nickname = nickname;
    await this.insert(user); // 테스트 끝난수 해제해야함

    return "OK";

  }

}
