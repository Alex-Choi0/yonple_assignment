import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/repository/users.repository';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';

@Module({
    imports:[
        TypeOrmModule.forFeature([UserRepository])
    ],
    controllers: [UsersController],
    providers: [UsersService],
})

export class UsersModule{

}
