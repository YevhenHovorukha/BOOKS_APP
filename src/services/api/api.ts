import { Book } from "./api.interface";

const API_URL = "http://localhost:8000/books";

export const getBooks = async (): Promise<Book[]> => {
  try {
    const response = await fetch(API_URL);
    return await response.json();
  } catch (error) {
    throw new Error(`Error in getBooks: ${error}`);
  }
};

export const getBookById = async (id: number): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch book with id ${id}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Error in getBooks: ${error}`);
  }
};

export const createBook = async (book: Book): Promise<Book> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });
    if (!response.ok) {
      throw new Error("Failed to create book");
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Error in getBooks: ${error}`);
  }
};

export const updateBook = async (id: string, book: Book): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });
    if (!response.ok) {
      throw new Error(`Failed to update book with id ${id}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Error in getBooks: ${error}`);
  }
};

export const deleteBook = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete book with id ${id}`);
    }
  } catch (error) {
    throw new Error(`Error in getBooks: ${error}`);
  }
};
