import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { MemberRepository } from './member.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { BcryptModule } from '../bcrypt/bcrypt.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '../jwt/jwt.module';

@Module({
  imports: [PrismaModule, BcryptModule, ConfigModule, JwtModule],
  controllers: [MemberController],
  providers: [MemberService, MemberRepository],
  exports: [MemberService],
})
export class MemberModule {}
