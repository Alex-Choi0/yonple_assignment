import { Body, Controller, Post } from '@nestjs/common';
import { SignupUserDto } from './dto/signup-user.dto';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post('join')
  async signup( @Body() dto : SignupUserDto){

    return {data : await this.service.signupUser(dto)}

  }

}
