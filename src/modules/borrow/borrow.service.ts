import { Borrow } from './borrow.model';
import { Book } from '../book/book.model';

export const borrowBook = async (payload: any) => {
  const book = await Book.findById(payload.book);
  if (!book || book.copies < payload.quantity) throw new Error('Not enough copies');

  book.copies -= payload.quantity;
  book.updateAvailability();
  await book.save();

  return await Borrow.create(payload);
};

export const borrowSummary = async () => {
  return await Borrow.aggregate([
    {
      $group: {
        _id: '$book',
        totalQuantity: { $sum: '$quantity' }
      }
    },
    {
      $lookup: {
        from: 'books',
        localField: '_id',
        foreignField: '_id',
        as: 'bookDetails'
      }
    },
    { $unwind: '$bookDetails' },
    {
      $project: {
        book: {
          title: '$bookDetails.title',
          isbn: '$bookDetails.isbn'
        },
        totalQuantity: 1
      }
    }
  ]);
};