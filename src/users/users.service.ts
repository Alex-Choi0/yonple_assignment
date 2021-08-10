import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { errcodeThrow } from 'src/function/errThrow';
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

    if(email.length === 0 || nickname.length === 0 || password.length === 0) errcodeThrow("1-2");

    else if(nickname.length > 10) errcodeThrow("1-3");

    else if(!/[0-9]/.test(password) || !/[a-zA-Z]/.test(password)) errcodeThrow("1-4");

    return this.userRepository.signupUser(email, nickname, password)

  }

  async signinUser(dto : SigninUserDto) : Promise <object>{
    const {email, password} = dto;
    return this.userRepository.signinUser(email, password)
  }
}
