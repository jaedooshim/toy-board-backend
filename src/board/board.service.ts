import { Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { ICreateBoard } from './types/create/request.interface';
import { MemberService } from '../member/member.service';
import { IUpdateBoard } from './types/update/request.interface';

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
}
