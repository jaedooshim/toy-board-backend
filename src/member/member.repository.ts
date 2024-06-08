import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Member } from '@prisma/client';
import { ICreateMember } from './types/create/request.interface';
import { PrismaService } from '../prisma/prisma.service';
import { IUpdateMember } from './types/update/request.interface';

@Injectable()
export class MemberRepository {
  constructor(private prisma: PrismaService) {}

  private memberRepository = this.prisma.extendedClient.member;
  async create(data: ICreateMember): Promise<Member> {
    return this.memberRepository.create({ data });
  }

  async update(id: string, data: IUpdateMember): Promise<Member> {
    return this.memberRepository.update({ where: { id }, data });
  }

  async updatePassword(id: string, newPassword: string) {
    const member = await this.memberRepository.findFirst({ where: { id } });
    member.password = newPassword;
    return await this.memberRepository.update({ where: { id }, data: { password: newPassword } });
  }

  async softDelete(id: string): Promise<Member> {
    return await this.memberRepository.softDelete({ id });
  }

  async findMany(): Promise<Member[]> {
    return await this.memberRepository.findMany();
  }

  async findUniqueOrThrow(id: string) {
    const member = await this.memberRepository.findFirst({ where: { id } });
    if (!member) throw new NotFoundException('존재하지 않는 회원입니다.');
    return member;
  }

  async isValidPhoneNumber(phoneNumber: string) {
    const member = await this.memberRepository.findFirst({ where: { phoneNumber } });
    if (member) throw new ConflictException('이미 등록된 전화번호입니다.  \n다시 한번 확인해주세요.');
  }

  async existEmail(email: string): Promise<void> {
    const existingEmail = await this.memberRepository.findFirst({ where: { email } });
    if (existingEmail) throw new ConflictException('등록된 이메일입니다. \n다시 한번 확인해주세요.');
  }

  async existNickname(nickname: string) {
    const existingNickname = await this.memberRepository.findFirst({ where: { nickname } });
    if (existingNickname) throw new ConflictException('이미 등록된 닉네임입니다. \n다시 한번 확인해주세요.');
  }

  async isValidEmail(email: string) {
    const member = await this.memberRepository.findFirst({ where: { email } });
    if (!member) throw new NotFoundException('등록되지 않은 이메일입니다. \n다시 한번 확인해주세요.');
    return member;
  }
}
