import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberCreateDto } from './types/create/request.dto';
import { MemberParamDto, UpdateMemberDto, UpdatePassword } from './types/update/request.dto';
import { Member } from '@prisma/client';
import { MemberAuthGuard } from '../guard/member.auth.guard';

@Controller('members')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Post()
  async create(@Body() body: MemberCreateDto): Promise<string> {
    return await this.memberService.create(body);
  }

  @Patch(':id')
  @UseGuards(MemberAuthGuard)
  async update(@Body() body: UpdateMemberDto, @Param() param: MemberParamDto): Promise<string> {
    return await this.memberService.update(param.id, body);
  }

  @Patch(':id/password')
  @UseGuards(MemberAuthGuard)
  async updatePassword(@Body() body: UpdatePassword, @Param() param: MemberParamDto): Promise<string> {
    return await this.memberService.updatePassword(param.id, body.oldPassword, body.newPassword);
  }

  @Delete(':id')
  @UseGuards(MemberAuthGuard)
  async delete(@Param() param: MemberParamDto): Promise<string> {
    return await this.memberService.softDelete(param.id);
  }

  @Get(':id')
  async findUnique(@Param() param: MemberParamDto): Promise<Member> {
    return await this.memberService.findUnique(param.id);
  }

  @Get()
  async findMany(): Promise<Member[]> {
    return await this.memberService.findMany();
  }
}
