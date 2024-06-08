import { IsEmail, IsNotEmpty, IsString, Length, MaxLength, MinLength } from 'class-validator';

export class MemberCreateDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 16)
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(13, 13)
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(5)
  @MinLength(2)
  nickname: string;
}
