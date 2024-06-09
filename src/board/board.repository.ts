import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ICreateBoard } from './types/create/request.interface';
import { Board, Prisma } from '@prisma/client';
import { IUpdateBoard } from './types/update/request.interface';

@Injectable()
export class BoardRepository {
  constructor(private prisma: PrismaService) {}

  private boardRepository = this.prisma.extendedClient.board;

  async create(data: ICreateBoard, memberId: string): Promise<Board> {
    const createData: Prisma.BoardCreateInput = {
      ...data,
      Member: { connect: { id: memberId } },
    };
    return await this.boardRepository.create({ data: createData });
  }

  async update(id: number, data: IUpdateBoard, memberId: string): Promise<Board> {
    console.log('ID', id);
    const updateData: Prisma.BoardUpdateInput = {
      ...data,
      Member: { connect: { id: memberId } },
    };
    return await this.boardRepository.update({ where: { id }, data: updateData });
  }

  async softDelete(id: number): Promise<Board> {
    return await this.boardRepository.softDelete({ id });
  }

  async findUniqueOrThrow(id: number) {
    const board = await this.boardRepository.findFirst({ where: { id } });
    if (!board) throw new NotFoundException('해당하는 게시글이 존재하지 않습니다.');
    return board;
  }

  async findMany(): Promise<Board[]> {
    return await this.boardRepository.findMany();
  }
}
