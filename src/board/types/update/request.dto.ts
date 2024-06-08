import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBoardDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content: string;
}

export class BoardParamDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
