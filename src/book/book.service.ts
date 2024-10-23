import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorService } from '../author/author.service';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private repo: Repository<Book>,
    private authorService: AuthorService,
  ) {}

  async getAll(): Promise<Book[]> {
    return await this.repo.find({ relations: { author: true } });
  }

  async getById(bookId: number): Promise<Book> {
    const book = await this.repo.findOne({
      where: { bookId },
      relations: { author: true },
    });
    if (!book) {
      throw new NotFoundException(`book with ID ${bookId} not found`);
    }
    return book;
  }

  async create(createDto: CreateBookDto): Promise<Book> {
    const author = await this.authorService.getById(createDto.authorId);
    const book = this.repo.create({
      title: createDto.title,
      genre: createDto.genre,
      publishedYear: createDto.publishedYear,
      author,
    });

    try {
      return await this.repo.save(book);
    } catch (error) {
      throw new BadRequestException('Error creating book: ' + error.message);
    }
  }

  async update(bookId: number, attrs: Partial<CreateBookDto>): Promise<Book> {
    const book = await this.getById(bookId);
    if (attrs.authorId) {
      const author = await this.authorService.getById(attrs.authorId);
      if (!author) {
        throw new NotFoundException(
          `Author with ID ${attrs.authorId} not found`,
        );
      }
      book.author = author;
    }
    Object.assign(book, attrs);
    try {
      return await this.repo.save(book);
    } catch (error) {
      throw new BadRequestException('Error updating book: ' + error.message);
    }
  }

  async delete(bookId: number) {
    try {
      const deletedBook = await this.repo.findOne({ where: { bookId } });
      if (!deletedBook) {
        throw new NotFoundException(`Book with ID ${bookId} not found`);
      }
      return this.repo.remove(deletedBook);
    } catch (error) {
      throw new BadRequestException('Error deleting book: ' + error.message);
    }
  }
}
