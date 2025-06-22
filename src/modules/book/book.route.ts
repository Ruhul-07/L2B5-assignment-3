import express from 'express';
import * as bookController from './book.controller';

const router = express.Router();

router.post('/', bookController.createBook);
router.get('/', bookController.getAllBooks);
router.get('/:bookId', bookController.getBook);
router.put('/:bookId', bookController.updateBook);
router.delete('/:bookId', bookController.deleteBook);

export default router;