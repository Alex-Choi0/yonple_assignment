import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeRepository } from '../repository/userLike.repository';

@Module({
    imports:[
        TypeOrmModule.forFeature([LikeRepository])
    ],
    controllers: [],
    providers: [],
})

export class LikeModule{

}
