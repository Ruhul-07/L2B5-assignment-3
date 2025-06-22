import { Book } from './book.model';

export const createBook = async (payload: any) => await Book.create(payload);
export const getBooks = async (query: any) => {
  const filter = query.filter ? { genre: query.filter } : {};
  const sortBy = query.sortBy || 'createdAt';
  const sortOrder = query.sort === 'asc' ? 1 : -1;
  const limit = Number(query.limit) || 10;
  return await Book.find(filter).sort({ [sortBy]: sortOrder }).limit(limit);
};
export const getBookById = async (id: string) => await Book.findById(id);
export const updateBook = async (id: string, data: any) => await Book.findByIdAndUpdate(id, data, { new: true });
export const deleteBook = async (id: string) => await Book.findByIdAndDelete(id);