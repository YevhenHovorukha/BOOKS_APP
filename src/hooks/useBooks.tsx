import { useContext } from "react";

import { BooksContext, BooksContextType } from "@context/BooksContext";

export const useBooks = (): BooksContextType => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error("useBooks must be used within a BooksProvider");
  }
  return context;
};
