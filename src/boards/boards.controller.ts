import { Body, Controller, Headers, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('api/boards')
export class BoardsController {
  constructor(private readonly service: BoardsService) {}

  @Post()
  async signup( @Body() dto : CreateBoardDto, @Headers() headers){
    return await this.service.create(dto, headers)
  }

}
