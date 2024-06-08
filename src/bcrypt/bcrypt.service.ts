import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare, hash } from 'bcrypt';

@Injectable()
export class BcryptService {
  constructor(private configService: ConfigService) {}

  async hash(password: string): Promise<string> {
    return await hash(password + this.configService.get<string>('PASSWORD_SECRET_KEY'), 12);
  }

  async compare(reqPassword: string, password: string): Promise<boolean> {
    return await compare(reqPassword + this.configService.get<string>('PASSWORD_SECRET_KEY'), password);
  }
}
