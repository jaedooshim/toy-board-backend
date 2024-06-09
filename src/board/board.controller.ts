import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './types/create/request.dto';
import { MemberAuthGuard } from '../guard/member.auth.guard';
import { IRequest } from '../jwt/request.interface';
import { BoardParamDto, UpdateBoardDto } from './types/update/request.dto';
import { Board, Comment } from '@prisma/client';
import { CommentService } from './comment/comment.service';
import { CreateCommentDto } from './comment/types/create/request.dto';
import { CommentParamDto, UpdateCommentDto } from './comment/types/update/request.dto';

@Controller('board')
export class BoardController {
  constructor(
    private boardService: BoardService,
    private commentService: CommentService,
  ) {}

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

  @Delete(':id')
  @UseGuards(MemberAuthGuard)
  async delete(@Param() param: BoardParamDto, @Req() req: IRequest): Promise<string> {
    const memberId = req.member.id;
    return await this.boardService.softDelete(param.id, memberId);
  }

  @Get(':id')
  async getBoard(@Param() param: BoardParamDto): Promise<Board> {
    return await this.boardService.findUnique(param.id);
  }

  @Get()
  async findMany(): Promise<Board[]> {
    return await this.boardService.findMany();
  }

  @Post('/:id/comment')
  @UseGuards(MemberAuthGuard)
  async createComment(@Body() body: CreateCommentDto, @Param() param: BoardParamDto, @Req() req: IRequest): Promise<string> {
    const memberId = req.member.id;
    return await this.commentService.create(body, param.id, memberId);
  }

  @Patch('/:id/comment/:commentId')
  @UseGuards(MemberAuthGuard)
  async updateComment(@Body() body: UpdateCommentDto, @Param() param: CommentParamDto, @Req() req: IRequest): Promise<string> {
    const memberId = req.member.id;
    return await this.commentService.update(body, param.commentId, param.id, memberId);
  }

  @Delete('/:id/comment/:commentId')
  @UseGuards(MemberAuthGuard)
  async deleteComment(@Param() param: CommentParamDto, @Req() req: IRequest): Promise<string> {
    const memberId = req.member.id;
    return await this.commentService.softDelete(param.commentId, param.id, memberId);
  }

  @Get('/:id/comment/:commentId')
  async getComment(@Param() param: CommentParamDto): Promise<Comment> {
    return await this.commentService.findUnique(param.commentId, param.id);
  }

  @Get('/:id/comment')
  async findManyComment(@Param() param: BoardParamDto): Promise<Comment[]> {
    return await this.commentService.findMany(param.id);
  }
}
