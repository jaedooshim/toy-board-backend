import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ICreateComment } from './types/create/request.interface';
import { Comment, Prisma } from '@prisma/client';
import { IUpdateComment } from './types/update/request.interface';

@Injectable()
export class CommentRepository {
  constructor(private prisma: PrismaService) {}

  private commentRepository = this.prisma.extendedClient.comment;

  async create(data: ICreateComment, memberId: string, boardId: number): Promise<Comment> {
    const createData: Prisma.CommentCreateInput = {
      ...data,
      Member: { connect: { id: memberId } },
      Board: { connect: { id: boardId } },
    };
    return await this.commentRepository.create({ data: createData });
  }

  async update(id: number, data: IUpdateComment, memberId: string, boardId: number): Promise<Comment> {
    const updateData: Prisma.CommentUpdateInput = {
      ...data,
      Member: { connect: { id: memberId } },
      Board: { connect: { id: boardId } },
    };
    return await this.commentRepository.update({ where: { id }, data: updateData });
  }

  async softDelete(id: number): Promise<Comment> {
    return await this.commentRepository.softDelete({ id });
  }

  async findUniqueOrThrow(id: number) {
    const comment = await this.commentRepository.findUnique({ where: { id } });
    if (!comment) throw new NotFoundException('해당하는 댓글은 존재하지 않습니다.');
    return comment;
  }

  async findMany(boardId: number): Promise<Comment[]> {
    return await this.commentRepository.findMany({ where: { boardId } });
  }
}
