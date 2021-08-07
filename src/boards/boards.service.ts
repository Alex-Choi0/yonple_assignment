import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { removeKeys } from 'src/function/removeKeys';
import { BoardRepository } from './boards.repository';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository
  ) {}

  async getall(){
    return this.boardRepository.getallBoard();
  }

  async getOne(id: number){
    const result = await this.boardRepository.getOneBoard(id);

    // 게시물 상세 조회 에러처리 1 : 해당 번호의 게시물이 없을 경우(404)
    if(!result){
      throw new HttpException("해당번호는 존재하지 않습니다.", HttpStatus.NOT_FOUND)
    }

    return removeKeys(result, ["id", "email", "password"]);
  }

  async create(dto : CreateBoardDto, headers : any){

    // 게시물 생성 에러처리 1 : 제목이 없을 경우(400)
    if(dto.title.length === 0){
      throw new HttpException('제목이 존재하지 않습니다.', HttpStatus.BAD_REQUEST)
    }

    // 게시물 생성 에러처리 2 : 내용이 없을경우(400)
    else if(dto.content.length === 0){
      throw new HttpException('내용이 존재하지 않습니다.', HttpStatus.BAD_REQUEST)
    }

    // 게시물 생성 에러처리 3 : 제목이 30자가 넘어갈 경우(403)
    else if(dto.title.length >30){
      throw new HttpException('제목이 30자가 넘어가면 안됩니다.', HttpStatus.FORBIDDEN)
    }

    // 게시물 생성 에러처리 4 : 인증 정보가 없을 경우(401)
    else if(!headers.authorization){
      throw new HttpException('인증정보가 존재하지 않습니다.', HttpStatus.UNAUTHORIZED)
    }

    return this.boardRepository.createBoard(dto, headers.authorization.split(" ")[1]);
  }

  async delete(id: number, headers: any){

    // 게시물 삭제 에러처리 1 : 인증 정보가 없을 경우(401)
    if(!headers.authorization){
      throw new HttpException('인증정보가 존재하지 않습니다.', HttpStatus.UNAUTHORIZED)
    }

    return this.boardRepository.deleteBoard(id,headers);
  }
}
