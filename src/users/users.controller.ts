import { Body, Controller, Post } from '@nestjs/common';
import { SigninUserDto } from './dto/signin-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post('join')
  async signup( @Body() dto : SignupUserDto){
    return {data : await this.service.signupUser(dto)}
  }

  @Post('login')
  async signin( @Body() dto : SigninUserDto){
    return await this.service.signinUser(dto)
  }

}
