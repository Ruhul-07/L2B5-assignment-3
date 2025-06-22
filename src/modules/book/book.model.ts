import mongoose, { Schema } from 'mongoose';

const genreEnum = ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'];

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true, enum: genreEnum },
  isbn: { type: String, required: true, unique: true },
  description: { type: String },
  copies: { type: Number, required: true, min: 0 },
  available: { type: Boolean, default: true },
}, { timestamps: true });

bookSchema.methods.updateAvailability = function () {
  this.available = this.copies > 0;
};

export const Book = mongoose.model('Book', bookSchema);