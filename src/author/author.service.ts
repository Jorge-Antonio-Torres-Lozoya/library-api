import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorService {
  constructor(@InjectRepository(Author) private repo: Repository<Author>) {}

  async getAll(): Promise<Author[]> {
    return await this.repo.find({ relations: { books: true } });
  }

  async getById(authorId: number): Promise<Author> {
    if (!authorId) {
      throw new BadRequestException('Author ID is required');
    }
    const author = await this.repo.findOne({ where: { authorId } });
    if (!author) {
      throw new NotFoundException(`Author with ID ${authorId} not found`);
    }
    return author;
  }

  async create(createDto: CreateAuthorDto): Promise<Author> {
    const author = this.repo.create(createDto);
    try {
      return await this.repo.save(author);
    } catch (error) {
      throw new BadRequestException('Error creating author: ' + error.message);
    }
  }

  async update(
    authorId: number,
    attrs: Partial<CreateAuthorDto>,
  ): Promise<Author> {
    try {
      const author = await this.getById(authorId);
      if (!author) {
        throw new NotFoundException(`Author with ID ${authorId} not found`);
      }
      Object.assign(author, attrs);
      return await this.repo.save(author);
    } catch (error) {
      throw new BadRequestException('Error updating author: ' + error.message);
    }
  }

  async delete(authorId: number): Promise<Author> {
    try {
      const author = await this.getById(authorId);
      if (!author) {
        throw new NotFoundException(`Author with ID ${authorId} not found`);
      }
      return await this.repo.remove(author);
    } catch (error) {
      throw new BadRequestException('Error deleting author: ' + error.message);
    }
  }
}
