import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MemberModule } from '../member/member.module';
import { BcryptModule } from '../bcrypt/bcrypt.module';
import { JwtModule } from '../jwt/jwt.module';

@Module({
  imports: [MemberModule, BcryptModule, JwtModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
