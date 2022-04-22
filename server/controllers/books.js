import express from 'express';
import mongoose from 'mongoose';

import Book from '../models/Book.js';

const router = express.Router();

export const getBooks = async (req, res) => { 
    try {
        const Books = await Book.find();
                
        res.status(200).json(Books);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getBook = async (req, res) => { 
    const { id } = req.params;

    try {
        const book = await Book.findById(id);

        if (!book) return res.status(404).json({ message: "Sorry, book can not be found!"})
        
        res.status(200).json(book);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createBook = async (req, res) => {
    const { name, price, description } = req.body;

    const newBook = new Book({ name, price, description })

    try {
        await newBook.save();

        res.status(201).json(newBook );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateBook = async (req, res) => {
    const { id } = req.params;
    const { name, price, description } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No book with id: ${id}`);

    const updatedBook = { name, price, description, _id: id };

    await Book.findByIdAndUpdate(id, updatedBook, { new: true });

    res.json(updatedBook);
    console.log('Book updated successfully!')
}

export const deleteBook = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No book with id: ${id}`);

    await Book.findByIdAndRemove(id);

    res.json({ message: "Book deleted successfully." });
}

export default router;