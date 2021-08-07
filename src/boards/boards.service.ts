import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './boards.repository';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository
  ) {}

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

}
