import { forwardRef, Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { BoardRepository } from './board.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { MemberModule } from '../member/member.module';
import { JwtModule } from '../jwt/jwt.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [PrismaModule, MemberModule, JwtModule, forwardRef(() => CommentModule)],
  controllers: [BoardController],
  providers: [BoardService, BoardRepository],
  exports: [BoardService],
})
export class BoardModule {}
