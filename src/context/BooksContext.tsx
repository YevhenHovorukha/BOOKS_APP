import { createContext } from "react";

import { Book } from "@services/api/api.interface";

export interface BooksContextType {
  books: Book[];
  loading: boolean;
  error: string | null;
  fetchBooks: () => void;
  fetchBookById: (id: number) => void;
  addBook: (book: Book) => void;
  updateBookById: (id: string, book: Book) => void;
  removeBook: (id: string) => void;
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

export const BooksContext = createContext<BooksContextType | undefined>(
  undefined
);
