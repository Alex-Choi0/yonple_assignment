// import { HttpException, HttpStatus } from '@nestjs/common';
// import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { checkToken } from '../function/token/tokenFun';
import { Board } from './boards.entity';
import { CreateBoardDto } from './dto/create-board.dto';
require('dotenv').config()

// Board entity를 불러서 DB의 테이블 생성
@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(dto : CreateBoardDto, token): Promise <object>{
    const writer = checkToken(token);
    const board = new Board();

    board.userId = writer.userId;
    board.title = dto.title;
    board.content = dto.content;

    await this.insert(board);
    const data = await this.findOne(board.id);

    return {...data, user: {nickname: writer.nickname}};
  }
}