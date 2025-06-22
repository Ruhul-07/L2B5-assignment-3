import { Request, Response } from 'express';
import * as borrowService from './borrow.service';
import { sendResponse } from '../../utils/sendResponse';

export const borrowBook = async (req: Request, res: Response) => {
 const { isbn, borrowerName } = req.body;
 const data = await borrowService.borrowBook(isbn, borrowerName);
  sendResponse(res, { success: true, message: 'Book borrowed successfully', data });
};

export const getBorrowSummary = async (req: Request, res: Response) => {
  const summary = await borrowService.getBorrowSummary();
  sendResponse(res, { success: true, message: 'Borrowed books summary retrieved successfully', data: summary });
};