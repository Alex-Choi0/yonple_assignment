import { HttpException, HttpStatus } from '@nestjs/common';
import { removeKeys } from 'src/function/removeKeys';
import { EntityRepository, Repository } from 'typeorm';
import { checkToken } from '../function/token/tokenFun';
import { Board } from './boards.entity';
import { CreateBoardDto } from './dto/create-board.dto';
require('dotenv').config()

// Board entity를 불러서 DB의 테이블 생성
@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {

  async getallBoard() {
    return (await this.createQueryBuilder('board')
      .leftJoinAndSelect('board.user','user')
      .getMany()).map((ele) => {
        return removeKeys(ele,["id", "email", "password"])
      });
  }

  async getOneBoard(id : number) {
    return (await this.createQueryBuilder('board')
      .leftJoinAndSelect('board.user','user')
      .where("board.id = :id", {id})
      .getOne());
  }

  async createBoard(dto : CreateBoardDto, token: string): Promise <object>{
    const writer = checkToken(token);
    const board = new Board();

    board.userId = writer.userId;
    board.title = dto.title;
    board.content = dto.content;

    await this.insert(board);
    const data = await this.findOne(board.id);

    return {...data, user: {nickname: writer.nickname}};
  }

  async deleteBoard(id: number, token: string): Promise<string> {
    const writer = checkToken(token);
    const board = await this.findOne({id});
    // 게시물 삭제 에러처리 3 : 해당 번호의 게시물이 없을 경우(404)
    if(!board){
      throw new HttpException('해당 번호의 게시물이 없습니다.', HttpStatus.NOT_FOUND);
    }

    // 게시물 삭제 에러처리 2 : 해당 게시물의 작성자가 아닐 경우(401)
    else if(board.userId !== writer.userId){
      throw new HttpException('해당 게시물의 작성자가 아닙니다.', HttpStatus.UNAUTHORIZED);
    }

    await this.delete({id});

    return "OK"

  }
}
