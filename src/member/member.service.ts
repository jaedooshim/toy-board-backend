import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { MemberRepository } from './member.repository';
import { ICreateMember } from './types/create/request.interface';
import { IUpdateMember } from './types/update/request.interface';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { Member } from '@prisma/client';

@Injectable()
export class MemberService {
  constructor(
    private memberRepository: MemberRepository,
    private bcryptService: BcryptService,
  ) {}

  async create(data: ICreateMember): Promise<string> {
    await this.memberRepository.existNickname(data.nickname);
    await this.memberRepository.existEmail(data.email);
    await this.memberRepository.isValidPhoneNumber(data.phoneNumber);
    data.password = await this.bcryptService.hash(data.password);
    await this.memberRepository.create(data);
    return '멤버가 생성되었습니다.';
  }

  async update(id: string, data: IUpdateMember): Promise<string> {
    await this.memberRepository.findUniqueOrThrow(id);
    await this.memberRepository.existNickname(data.nickname);
    await this.memberRepository.update(id, data);
    return '수정이 완료되었습니다.';
  }

  async updatePassword(id: string, oldPassword: string, newPassword: string): Promise<string> {
    const member = await this.memberRepository.findUniqueOrThrow(id);
    const password = await this.bcryptService.compare(oldPassword, member.password);
    if (!password) throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    if (oldPassword === newPassword) throw new ConflictException('현재 비밀번호와 일치합니다. \n변경할 비밀번호를 입력해주세요.');

    const hashPassword = await this.bcryptService.hash(newPassword);
    await this.memberRepository.updatePassword(id, hashPassword);
    return '비밀번호가 변경되었습니다.';
  }

  async softDelete(id: string): Promise<string> {
    const member = await this.memberRepository.findUniqueOrThrow(id);
    if (member.deletedAt) throw new NotFoundException('존재하지 않는 회원입니다.');
    await this.memberRepository.softDelete(id);
    return '삭제가 완료되었습니다.';
  }

  async findUnique(id: string): Promise<Member> {
    return await this.memberRepository.findUniqueOrThrow(id);
  }

  async findMany(): Promise<Member[]> {
    return await this.memberRepository.findMany();
  }

  async getEmail(email: string) {
    return await this.memberRepository.isValidEmail(email);
  }
}
