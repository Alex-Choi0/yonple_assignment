import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsController } from 'src/boards/boards.controller';
import { BoardsService } from 'src/boards/boards.service';
import { BoardRepository } from 'src/repository/boards.repository';

@Module({
    imports:[
        TypeOrmModule.forFeature([BoardRepository])
    ],
    controllers: [BoardsController],
    providers: [BoardsService],
})

export class BoardsModule{

}
