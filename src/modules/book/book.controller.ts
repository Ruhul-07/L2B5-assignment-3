import { Request, Response } from 'express';
import * as bookService from './book.service';
import { sendResponse } from '../../utils/sendResponse';

export const createBook = async (req: Request, res: Response) => {
  const book = await bookService.createBook(req.body);
  sendResponse(res, { success: true, message: 'Book created successfully', data: book });
};

export const getAllBooks = async (req: Request, res: Response) => {
  const books = await bookService.getBooks(req.query);
  sendResponse(res, { success: true, message: 'Books retrieved successfully', data: books });
};

export const getBook = async (req: Request, res: Response) => {
  const book = await bookService.getBookById(req.params.bookId);
  sendResponse(res, { success: true, message: 'Book retrieved successfully', data: book });
};

export const updateBook = async (req: Request, res: Response) => {
  const book = await bookService.updateBook(req.params.bookId, req.body);
  sendResponse(res, { success: true, message: 'Book updated successfully', data: book });
};

export const deleteBook = async (req: Request, res: Response) => {
  await bookService.deleteBook(req.params.bookId);
  sendResponse(res, { success: true, message: 'Book deleted successfully', data: null });
};
