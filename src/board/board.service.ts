import { Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { ICreateBoard } from './types/create/request.interface';
import { MemberService } from '../member/member.service';
import { IUpdateBoard } from './types/update/request.interface';
import { Board } from '@prisma/client';

@Injectable()
export class BoardService {
  constructor(
    private boardRepository: BoardRepository,
    private memberService: MemberService,
  ) {}

  async create(data: ICreateBoard, memberId: string): Promise<string> {
    await this.memberService.findUnique(memberId);
    await this.boardRepository.create(data, memberId);
    return '게시글이 생성되었습니다.';
  }

  async update(id: number, data: IUpdateBoard, memberId: string): Promise<string> {
    await this.memberService.findUnique(memberId);
    await this.boardRepository.findUniqueOrThrow(id);
    await this.boardRepository.update(id, data, memberId);
    return '게시글이 수정되었습니다.';
  }

  async softDelete(id: number, memberId: string): Promise<string> {
    await this.memberService.findUnique(memberId);
    await this.boardRepository.findUniqueOrThrow(id);
    await this.boardRepository.softDelete(id);
    return '게시글이 삭제되었습니다.';
  }

  async findUnique(id: number): Promise<Board> {
    return await this.boardRepository.findUniqueOrThrow(id);
  }

  async findMany(): Promise<Board[]> {
    return await this.boardRepository.findMany();
  }
}
