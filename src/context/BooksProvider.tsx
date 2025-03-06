import React, { useState, useEffect } from "react";

import { BooksContext } from "./BooksContext";

import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook,
} from "@services/api/api";
import { Book } from "@services/api/api.interface";

export const BooksProvider = ({ children }: { children: React.ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const data = await getBooks();
      setBooks(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookById = async (id: number) => {
    setLoading(true);
    try {
      const book = await getBookById(id);
      setBooks([book]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addBook = async (book: Book) => {
    setLoading(true);
    try {
      const newBook = await createBook(book);
      setBooks((prevBooks) => [...prevBooks, newBook]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateBookById = async (id: string, book: Book) => {
    setLoading(true);
    try {
      const updatedBook = await updateBook(id, book);
      setBooks((prevBooks) =>
        prevBooks.map((b) => (b.id === id ? updatedBook : b))
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeBook = async (id: string) => {
    setLoading(true);
    try {
      await deleteBook(id);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BooksContext.Provider
      value={{
        books,
        loading,
        error,
        fetchBooks,
        fetchBookById,
        addBook,
        updateBookById,
        removeBook,
        setBooks,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};
