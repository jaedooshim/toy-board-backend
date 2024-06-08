import { JwtPayload } from 'jsonwebtoken';

export interface IPayload extends JwtPayload {
  nickname: string;
  id: string;
}
