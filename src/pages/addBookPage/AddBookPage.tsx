import React, { useState, useEffect } from "react";
import { Book } from "@services/api/api.interface";
import { useBooks } from "@hooks/useBooks";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { toZonedTime } from "date-fns-tz";

import "./AddBookPage.scss";
import { SELECT_OPTIONS } from "./mocs";

const AddBookPage: React.FC = () => {
  const { addBook, books, updateBookById } = useBooks();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [book, setBook] = useState<Book>({
    id: "",
    title: "",
    author: "",
    category: "",
    isbn: "",
    createdAt: "",
    modifiedAt: "--",
    isActive: true,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (id) {
      const bookData = books.find((book) => book.id === id);
      if (bookData) {
        setBook({
          id: bookData.id,
          title: bookData.title,
          author: bookData.author,
          category: bookData.category,
          isbn: bookData.isbn,
          createdAt: bookData.createdAt,
          modifiedAt: bookData.modifiedAt,
          isActive: bookData.isActive,
        });
      }
    }
  }, [id, books]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!book.title.match(/^[A-Za-z0-9 ]{3,100}$/)) {
      newErrors.title =
        "Title must be 3-100 characters, only letters and numbers.";
    }
    if (!book.author.match(/^[A-Za-z.'\s]{3,50}$/)) {
      newErrors.author =
        "Author name must be 3-50 characters, only letters, dots, apostrophes, and spaces.";
    }
    if (!book.category) {
      newErrors.category = "Please select a category.";
    }
    if (!book.isbn.match(/^[0-9]{10,13}$/)) {
      newErrors.isbn = "ISBN must be 10-13 digits.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const createdAt = id
        ? book.createdAt
        : format(toZonedTime(new Date(), timeZone), "dd MMMM yyyy, h:mm a", {
            locale: enUS,
          });

      const modifiedAt = id
        ? format(toZonedTime(new Date(), timeZone), "dd MMMM yyyy, h:mm a", {
            locale: enUS,
          })
        : "--";

      if (id) {
        updateBookById(id, { ...book, modifiedAt });

        setSuccessMessage("Book successfully updated!");
      } else {
        addBook({ ...book, id: Date.now().toString(), createdAt });
        setSuccessMessage("Book successfully added!");
      }

      setErrors({});
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  return (
    <div className="add-book-page">
      <h1>{id ? "Edit Book" : "Add a New Book"}</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="title">Book Title</label>
          <input
            id="title"
            name="title"
            value={book.title}
            onChange={handleChange}
            placeholder="Enter book title"
            required
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="author">Author Name</label>
          <input
            id="author"
            name="author"
            value={book.author}
            onChange={handleChange}
            placeholder="Enter author's name"
            required
          />
          {errors.author && <p className="error">{errors.author}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={book.category}
            onChange={handleChange}
            required
          >
            <option value="">Select option</option>
            {SELECT_OPTIONS.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
          {errors.category && <p className="error">{errors.category}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="isbn">ISBN</label>
          <input
            id="isbn"
            name="isbn"
            value={book.isbn}
            onChange={handleChange}
            placeholder="Enter ISBN number"
            required
          />
          {errors.isbn && <p className="error">{errors.isbn}</p>}
        </div>

        <button type="submit">{id ? "Update Book" : "Add Book"}</button>

        {successMessage && <p className="success">{successMessage}</p>}
      </form>

      <a href="/dashboard" className="dashboard-link">
        Go to Dashboard
      </a>
    </div>
  );
};

export default AddBookPage;
