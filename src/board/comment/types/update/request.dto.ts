import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class UpdateCommentDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  desc: string;
}

export class CommentParamDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  commentId: number;
}
