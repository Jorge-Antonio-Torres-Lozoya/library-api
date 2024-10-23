import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @IsNumber()
  @IsNotEmpty()
  authorId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  genre: string;

  @IsNumber()
  @IsNotEmpty()
  publishedYear: number;
}
