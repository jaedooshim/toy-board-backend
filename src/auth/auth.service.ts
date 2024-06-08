import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ILogin } from './auth.login.interface';
import { MemberService } from '../member/member.service';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private memberService: MemberService,
    private bcryptService: BcryptService,
    private jwtService: JwtService,
  ) {}

  async login(data: ILogin): Promise<string> {
    try {
      const member = await this.memberService.getEmail(data.email);
      console.log(data.email);
      const password = await this.bcryptService.compare(data.password, member.password);
      if (!password) throw new BadRequestException('비밀번호가 일치하지 않습니다. \n다시 한번 확인해주세요.');

      const payload = { id: member.id, nickname: member.nickname };
      const accessToken = this.jwtService.sign(payload);
      return accessToken;
    } catch (err) {
      console.log(err.message);
    }
  }
}
