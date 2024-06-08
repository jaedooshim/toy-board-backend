import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '../jwt/jwt.service';
import { Observable } from 'rxjs';
import { IRequest } from '../jwt/request.interface';

@Injectable()
export class MemberAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request: IRequest = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(req: IRequest): Promise<boolean> {
    let accessToken = (req.headers as any).authorization;
    if (!accessToken) throw new UnauthorizedException('비회원은 이용하실 수 없는 서비스입니다.');
    accessToken = accessToken.split(' ')[1];
    console.log('TOKEN', accessToken);
    const payload = this.jwtService.verify(accessToken);
    console.log('PAYLOAD', payload);
    if (typeof payload === 'string') throw new UnauthorizedException('해당하는 권한이 없습니다.');

    req.member = payload;
    return true;
  }
}
