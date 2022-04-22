import express from 'express';

import { getBooks, getBook, createBook, updateBook, deleteBook } from '../controllers/books.js';

const router = express.Router();

// Add Book
router.post('/', createBook);

// Get all Book
router.get('/', getBooks);

// Get Book
router.get('/:id', getBook);

// Update Book
router.patch('/:id', updateBook);

// Delete Book
router.delete('/:id', deleteBook);

export default router;