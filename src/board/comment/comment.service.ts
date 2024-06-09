import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { ICreateComment } from './types/create/request.interface';
import { BoardService } from '../board.service';
import { MemberService } from '../../member/member.service';
import { IUpdateComment } from './types/update/request.interface';
import { Comment } from '@prisma/client';

@Injectable()
export class CommentService {
  constructor(
    private commentRepository: CommentRepository,
    private boardService: BoardService,
    private memberService: MemberService,
  ) {}

  async create(data: ICreateComment, boardId: number, memberId: string): Promise<string> {
    await this.memberService.findUnique(memberId);
    await this.boardService.findUnique(boardId);
    await this.commentRepository.create(data, memberId, boardId);
    return '댓글이 작성되었습니다.';
  }

  async update(data: IUpdateComment, id: number, boardId: number, memberId: string): Promise<string> {
    await this.memberService.findUnique(memberId);
    await this.boardService.findUnique(boardId);
    const comment = await this.commentRepository.findUniqueOrThrow(id);
    if (comment.boardId !== boardId) throw new ConflictException('해당하는 게시글의 댓글이 아닙니다.');
    await this.commentRepository.update(id, data, memberId, boardId);
    return '댓글이 수정되었습니다.';
  }

  async softDelete(id: number, boardId: number, memberId: string): Promise<string> {
    await this.memberService.findUnique(memberId);
    await this.boardService.findUnique(boardId);
    const comment = await this.commentRepository.findUniqueOrThrow(id);
    if (comment.boardId !== boardId) throw new ConflictException('해당하는 게시글의 댓글이 아닙니다.');
    await this.commentRepository.softDelete(id);
    return '댓글이 삭제되었습니다.';
  }

  async findUnique(id: number, boardId: number): Promise<Comment> {
    await this.boardService.findUnique(boardId);
    const comment = await this.commentRepository.findUniqueOrThrow(id);
    if (comment.boardId !== boardId) throw new ConflictException('해당하는 게시글의 댓글이 존재하지 않습니다.');
    return comment;
  }

  async findMany(boardId: number): Promise<Comment[]> {
    await this.boardService.findUnique(boardId);
    return await this.commentRepository.findMany(boardId);
  }
}
