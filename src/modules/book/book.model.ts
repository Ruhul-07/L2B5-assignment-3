// import mongoose, { Schema } from 'mongoose';

// const genreEnum = ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'];

// const bookSchema = new Schema({
//   title: { type: String, required: true },
//   author: { type: String, required: true },
//   genre: { type: String, required: true, enum: genreEnum },
//   isbn: { type: String, required: true, unique: true },
//   description: { type: String },
//   copies: { type: Number, required: true, min: 0 },
//   available: { type: Boolean, default: true },
// }, { timestamps: true });

// bookSchema.methods.updateAvailability = function () {
//   this.available = this.copies > 0;
// };

// export const Book = mongoose.model('Book', bookSchema);



import mongoose, { Schema, Document, Model } from 'mongoose';

const genreEnum = ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'] as const;

// 1. Interface to define the shape of the Book + method
export interface IBook extends Document {
  title: string;
  author: string;
  genre: typeof genreEnum[number];
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  updateAvailability(): void;
}

// 2. Schema definition
const bookSchema: Schema<IBook> = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true, enum: genreEnum },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// 3. Method added to the schema
bookSchema.methods.updateAvailability = function () {
  this.available = this.copies > 0;
};

// 4. Create model from schema
export const Book: Model<IBook> = mongoose.model<IBook>('Book', bookSchema);
