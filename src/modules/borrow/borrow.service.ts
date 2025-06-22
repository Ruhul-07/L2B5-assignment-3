// import { Borrow } from './borrow.model';
// import { Book } from '../book/book.model';

// export const borrowBook = async (payload: any) => {
//   const book = await Book.findById(payload.book);
//   if (!book || book.copies < payload.quantity) throw new Error('Not enough copies');

//   book.copies -= payload.quantity;
//   book.updateAvailability();
//   await book.save();

//   return await Borrow.create(payload);
// };

// export const borrowSummary = async () => {
//   return await Borrow.aggregate([
//     {
//       $group: {
//         _id: '$book',
//         totalQuantity: { $sum: '$quantity' }
//       }
//     },
//     {
//       $lookup: {
//         from: 'books',
//         localField: '_id',
//         foreignField: '_id',
//         as: 'bookDetails'
//       }
//     },
//     { $unwind: '$bookDetails' },
//     {
//       $project: {
//         book: {
//           title: '$bookDetails.title',
//           isbn: '$bookDetails.isbn'
//         },
//         totalQuantity: 1
//       }
//     }
//   ]);
// };




import { Book } from '../book/book.model';
import { Borrow } from './borrow.model';

export const borrowBook = async (isbn: string, borrowerName: string) => {
  const book = await Book.findOne({ isbn });

  if (!book) {
    throw new Error('Book not found');
  }

  if (book.copies < 1) {
    throw new Error('Book is currently unavailable');
  }

  // Decrease the number of available copies
  book.copies -= 1;
  book.updateAvailability(); // ✅ This will now work properly
  await book.save();

  // Create a borrow record
  const borrowRecord = new Borrow({
    isbn,
    borrowerName,
    borrowDate: new Date(),
  });

  await borrowRecord.save();

  return {
    message: 'Book borrowed successfully',
    borrowRecord,
  };
};

export const getBorrowSummary = async () => {
  const summary = await Borrow.aggregate([
    {
      $group: {
        _id: '$isbn',
        totalBorrowed: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: 'books',
        localField: '_id',
        foreignField: 'isbn',
        as: 'bookDetails',
      },
    },
    {
      $unwind: '$bookDetails',
    },
    {
      $project: {
        _id: 0,
        isbn: '$_id',
        title: '$bookDetails.title',
        totalBorrowed: 1,
      },
    },
  ]);

  return summary;
};
