import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IPayload } from './payload.interface';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor(private configService: ConfigService) {}

  sign(member: IPayload): string {
    const { id, nickname } = member;
    return sign({ id, nickname }, this.configService.get<string>('ACCESS_TOKEN_SECRET_KEY')!, {
      expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRES_IN'),
    });
  }

  verify(accessToken: string): IPayload | string {
    try {
      return verify(accessToken, this.configService.get<string>('ACCESS_TOKEN_SECRET_KEY')!) as IPayload;
    } catch (error) {
      return error.message as string;
    }
  }
}
