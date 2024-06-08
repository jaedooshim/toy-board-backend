import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateMemberDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(5)
  @MinLength(2)
  nickname: string;
}

export class MemberParamDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}

export class UpdatePassword {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
