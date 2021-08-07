import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('api/boards')
export class BoardsController {
  constructor(private readonly service: BoardsService) {}

  @Get()
  async getall(@Headers() headers){
    return await this.service.getall(headers)
  }

  @Post()
  async signup( @Body() dto : CreateBoardDto, @Headers() headers){
    return await this.service.create(dto, headers)
  }

}
