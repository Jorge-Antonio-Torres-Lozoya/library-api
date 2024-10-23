import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AuthorService } from './author.service';
import { Author } from './author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  async getAllAuthors(): Promise<Author[]> {
    return await this.authorService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') authorId: string): Promise<Author> {
    const author = await this.authorService.getById(parseInt(authorId));
    return author;
  }

  @Post()
  async createAuthor(@Body() body: CreateAuthorDto): Promise<Author> {
    const author = await this.authorService.create(body);
    return author;
  }

  @Put('/:id')
  async update(
    @Param('id') authorId: string,
    @Body() body: CreateAuthorDto,
  ): Promise<Author> {
    const authorUpdated = await this.authorService.update(
      parseInt(authorId),
      body,
    );
    return authorUpdated;
  }

  @Delete('/:id')
  async delete(@Param('id') authorId: string): Promise<Author> {
    const author = await this.authorService.delete(parseInt(authorId));
    return author;
  }
}
