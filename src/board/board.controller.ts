import { Body, Controller, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './types/create/request.dto';
import { MemberAuthGuard } from '../guard/member.auth.guard';
import { IRequest } from '../jwt/request.interface';
import { BoardParamDto, UpdateBoardDto } from './types/update/request.dto';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Post()
  @UseGuards(MemberAuthGuard)
  async create(@Body() body: CreateBoardDto, @Req() req: IRequest): Promise<string> {
    const memberId = req.member.id;
    return await this.boardService.create(body, memberId);
  }

  @Put(':id')
  @UseGuards(MemberAuthGuard)
  async update(@Body() body: UpdateBoardDto, @Req() req: IRequest, @Param() param: BoardParamDto): Promise<string> {
    console.log('PARAM_ID', param.id);
    const memberId = req.member.id;
    return await this.boardService.update(param.id, body, memberId);
  }
}
