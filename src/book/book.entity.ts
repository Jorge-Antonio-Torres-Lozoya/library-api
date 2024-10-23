import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Author } from '../author/author.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  bookId: number;

  @Column()
  title: string;

  @Column()
  genre: string;

  @Column()
  publishedYear: number;

  @ManyToOne(() => Author, (author) => author.books, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  author: Author;
}
