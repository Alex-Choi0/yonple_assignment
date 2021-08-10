import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { errcodeThrow } from 'src/function/errThrow';
import { removeKeys } from 'src/function/removeKeys';
import { BoardRepository } from '../repository/boards.repository';
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

    if(!result) errcodeThrow("nonexist");

    return removeKeys(result, ["id", "email", "password"]);
  }

  async create(dto : CreateBoardDto, headers : any){

    if(dto.title.length === 0) errcodeThrow("3-1");

    else if(dto.content.length === 0) errcodeThrow("3-2");

    else if(dto.title.length >30) errcodeThrow("3-3");

    else if(!headers.authorization) errcodeThrow("auth");

    return this.boardRepository.createBoard(dto, headers.authorization.split(" ")[1]);
  }

  async delete(id: number, headers: any){

    if(!headers.authorization) errcodeThrow("auth");

    return this.boardRepository.deleteBoard(id,headers.authorization.split(" ")[1]);
  }

  async likeOne(id:number, headers: any){

    if(!headers.authorization) errcodeThrow("auth");

    return this.boardRepository.likeOneboard(id, headers.authorization.split(" ")[1]);

  }
}
