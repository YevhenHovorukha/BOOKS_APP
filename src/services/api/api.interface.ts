export type Category =
  | "non-fiction"
  | "Romance"
  | "Fantasy"
  | "Adventure"
  | "Epic"
  | "Classic"
  | "Philosophical"
  | "Horror"
  | "Dystopian"
  | "Gothic"
  | "Poetry"
  | "Psychological"
  | "Historical"
  | "Drama";

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  createdAt: string;
  modifiedAt: string;
  isActive: boolean;
}
