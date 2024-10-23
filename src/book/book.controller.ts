import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './book.entity';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return await this.bookService.getAll();
  }

  @Get('by-genre')
  async filterBooksByGenre(@Query('genre') genre: string): Promise<Book[]> {
    if (!genre || typeof genre !== 'string') {
      throw new BadRequestException('Genre is required and must be a string.');
    }
    return this.bookService.filterBooksByGenre(genre);
  }

  @Get('by-title')
  async filterBooks(@Query('title') title: string): Promise<Book[]> {
    if (!title || typeof title !== 'string') {
      throw new BadRequestException('Title is required and must be a string.');
    }
    return this.bookService.filterBooksByTitle(title);
  }

  @Get('by-author')
  async filterBooksByAuthor(@Query('author') author: string): Promise<Book[]> {
    if (!author || typeof author !== 'string') {
      throw new BadRequestException('Author is required and must be a string.');
    }
    return this.bookService.filterBooksByAuthor(author);
  }

  @Get('by-published-year')
  async filterBooksByPublishedYear(
    @Query('publishedYear') publishedYear: string,
  ): Promise<Book[]> {
    if (!publishedYear) {
      throw new BadRequestException('Published year is required.');
    }
    return this.bookService.filterBooksByPublishedYear(publishedYear);
  }

  @Get(':id')
  async findOne(@Param('id') bookId: string): Promise<Book> {
    const book = await this.bookService.getById(parseInt(bookId));
    return book;
  }

  @Post()
  async createBook(@Body() body: CreateBookDto): Promise<Book> {
    const book = await this.bookService.create(body);
    return book;
  }

  @Put('/:id')
  async update(
    @Param('id') bookId: string,
    @Body() body: CreateBookDto,
  ): Promise<Book> {
    const bookUpdated = await this.bookService.update(parseInt(bookId), body);
    return bookUpdated;
  }

  @Delete('/:id')
  async delete(@Param('id') bookId: string): Promise<Book> {
    const book = await this.bookService.delete(parseInt(bookId));
    return book;
  }
}
