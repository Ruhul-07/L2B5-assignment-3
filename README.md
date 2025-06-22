# Library Management API

A RESTful API for managing a library system, built with **Express**, **TypeScript**, **MongoDB**, and **Mongoose**.  
This API supports book management and borrowing functionality with a clean modular architecture.


---

## 🚀 Features

- Create, read, update, and delete books
- Borrow books with quantity management
- Aggregated borrow summary
- Clean modular folder structure
- Global error handling and response formatting

---

## 📁 Folder Structure

src/
├── app.ts
├── server.ts
├── config/
│   └── db.ts
├── modules/
│   ├── book/
│   │   ├── book.model.ts
│   │   ├── book.controller.ts
│   │   ├── book.service.ts
│   │   └── book.route.ts
│   ├── borrow/
│   │   ├── borrow.model.ts
│   │   ├── borrow.controller.ts
│   │   ├── borrow.service.ts
│   │   └── borrow.route.ts
├── routes/
│   └── index.ts
├── middlewares/
│   ├── errorHandler.ts
│   └── validateRequest.ts
└── utils/
    └── sendResponse.ts

---

## ⚙️ Installation

1. Clone the repo:

   ```bash
   git clone <repository-url>
   cd Library-Management-API
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file and add:

   ```
   DB_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/library?retryWrites=true&w=majority
   PORT=5000
   ```

4. Run the app in development mode:

   ```bash
   npm run dev
   ```

---

## 📡 API Endpoints

All endpoints are prefixed with `/api`.

### Books

| Method | Endpoint           | Description                 |
| ------ | ------------------ | ---------------------------|
| POST   | `/api/books`       | Create a new book           |
| GET    | `/api/books`       | Get all books (with filter, pagination) |
| GET    | `/api/books/:bookId` | Get single book by ID      |
| PUT    | `/api/books/:bookId` | Update a book by ID         |
| DELETE | `/api/books/:bookId` | Delete a book by ID         |

**Sample Request to Create a Book**

```json
POST /api/books
Content-Type: application/json

{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5
}
```

---

### Borrowing

| Method | Endpoint        | Description                   |
| ------ | --------------- | -----------------------------|
| POST   | `/api/borrow`   | Borrow a book (reduce copies) |
| GET    | `/api/borrow`   | Get borrow summary (aggregated data) |

**Sample Request to Borrow a Book**

```json
POST /api/borrow
Content-Type: application/json

{
  "book": "64f123abc4567890def12345",
  "quantity": 1,
  "dueDate": "2024-12-01T00:00:00.000Z"
}
```

**Sample Response**

```json
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": {
    "_id": "64f124abc4567890def67890",
    "book": "64f123abc4567890def12345",
    "quantity": 1,
    "dueDate": "2024-12-01T00:00:00.000Z",
    "createdAt": "2024-11-19T11:00:00.000Z",
    "updatedAt": "2024-11-19T11:00:00.000Z"
  }
}
```

---

## 🛠 Scripts

| Script          | Description                            |
| --------------- | -------------------------------------|
| `npm run dev`   | Run the app in development mode with auto reload |
| `npm run build` | Compile TypeScript to JavaScript      |
| `npm start`     | Run the compiled JavaScript in production |

---

## 💡 Notes

- Make sure MongoDB is running or your Atlas URI is correct.
- All data is validated and errors handled by a global error handler.
- The API responses are consistently formatted with `success`, `message`, and `data` keys.

---

## 📜 License

This project is licensed under the MIT License.

---

## 🙋‍♂️ Author

Created by [Ruhul Amin]  
Feel free to contact me for any questions.

---

Thank you for using the Library Management API!  
Happy coding 🚀
