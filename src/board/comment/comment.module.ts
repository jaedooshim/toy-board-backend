import { forwardRef, Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentRepository } from './comment.repository';
import { PrismaModule } from '../../prisma/prisma.module';
import { MemberModule } from '../../member/member.module';
import { BoardModule } from '../board.module';
import { JwtModule } from '../../jwt/jwt.module';

@Module({
  imports: [PrismaModule, MemberModule, forwardRef(() => BoardModule), JwtModule],
  providers: [CommentService, CommentRepository],
  exports: [CommentService],
})
export class CommentModule {}
