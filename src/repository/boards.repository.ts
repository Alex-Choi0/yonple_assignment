import { Like } from 'src/entity/userLike.entity';
import { errcodeThrow } from 'src/function/errThrow';
import { removeKeys } from 'src/function/removeKeys';
// import { User } from 'src/users/users.entity';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { CreateBoardDto } from '../boards/dto/create-board.dto';
import { Board } from '../entity/boards.entity';
import { checkToken } from '../function/token/tokenFun';
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
    const board = await this.findOne(id);

    if(!board) errcodeThrow("nonexist");
    else if(board.userId !== writer.userId) errcodeThrow("6-2");

    await this.delete({id});

    return "OK"

  }

  async likeOneboard(boardId: number, token: string) {
    const writer = checkToken(token);
    const board = await this.findOne(boardId);
    let likeRepo = getRepository(Like);
    const find = await likeRepo.findAndCount({userId: writer.userId, boardId})

    if(!board) errcodeThrow("nonexist");

    let result = null;

    if(find[1] > 0){
      result = await this.getOneBoard(boardId);
      removeKeys(result, ["id", "email", "password"]);
      result["isLike"] = false;
      return result;
    }

    await likeRepo.insert({userId: writer.userId, boardId});
    board.like++;
    await this.save(board);
    result = await this.getOneBoard(boardId);
    removeKeys(result, ["id", "email", "password"]);
    result["isLike"] = true;

    return result;
  }
}
