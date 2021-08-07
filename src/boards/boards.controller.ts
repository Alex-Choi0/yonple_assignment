import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('api/boards')
export class BoardsController {
  constructor(private readonly service: BoardsService) {}

  @Get()
  async getall(){
    return await this.service.getall()
  }

  @Get(':id')
  async getOne(
    @Param('id') id:number
  ){
    return await this.service.getOne(id);
  }

  @Post()
  async signup( @Body() dto : CreateBoardDto, @Headers() headers){
    return await this.service.create(dto, headers)
  }

}
