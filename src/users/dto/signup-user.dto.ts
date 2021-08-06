import { IsString } from 'class-validator';

export class SignupUserDto {
  @IsString()
  email: string;

  @IsString()
  nickname: string;

  @IsString()
  password: string;

}
