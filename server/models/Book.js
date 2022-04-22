import mongoose from "mongoose";

const BookSchema = mongoose.Schema({
  name: {
    type: String
  },
  price: {
    type: String
  },
  description: {
    type: String
  }
}, {
  collection: 'books'
})

var Book = mongoose.model('Book', BookSchema)

export default Book;