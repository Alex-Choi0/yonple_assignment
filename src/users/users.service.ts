import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/repository/users.repository';
import { SigninUserDto } from './dto/signin-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {}

  async signupUser(dto : SignupUserDto) : Promise <string>{

    const {email, nickname, password} = dto;

    // 회원가입 에러처리 2 : 이메일, 닉네임, 비밀번호 컬럼이 비었을 경우(400)
    if(email.length === 0 || nickname.length === 0 || password.length === 0){
      throw new HttpException('이메일, 닉네임 또는 비밀번호 컬럼이 비어있습니다.', HttpStatus.BAD_REQUEST);
    }

    // 회원가입 에러처리 3 : 닉네임이 10자 초과인 경우(403)
    else if(nickname.length > 10){
      throw new HttpException('닉네임이 10자 초과하였습니다.', HttpStatus.FORBIDDEN);
    }

    // 회원가입 에러처리 4 : 비밀번호에 영문과 숫자가 포함되지 않았을 경우(403)
    else if(!/[0-9]/.test(password) || !/[a-zA-Z]/.test(password)){
      throw new HttpException('비밀번호는 영문과 숫자가 포함되야 합니다.', HttpStatus.FORBIDDEN);
    }

    return this.userRepository.signupUser(email, nickname, password)

  }

  async signinUser(dto : SigninUserDto) : Promise <object>{
    const {email, password} = dto;
    return this.userRepository.signinUser(email, password)
  }
}
