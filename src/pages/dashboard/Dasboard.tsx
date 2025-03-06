import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Dashboard.scss";
import { useBooks } from "@hooks/useBooks";
import { updateBook } from "@services/api/api";

export default function Dashboard() {
  const { books, removeBook, setBooks } = useBooks();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("Show Active");

  const filteredBooks = books.filter((book) => {
    if (filter === "Show All") return true;
    if (filter === "Show Active") return book.isActive;
    if (filter === "Show Deactivated") return !book.isActive;
    return true;
  });

  const handleEdit = (id: string) => {
    navigate(`/add/${id}`);
  };

  const handleDeactivate = async (id: string, isActive: boolean) => {
    const bookToUpdate = books.find((book) => book.id === id);

    if (!bookToUpdate) {
      throw new Error(`Book with id ${id} not found`);
    }
    await updateBook(id, {
      ...bookToUpdate,
      isActive: !isActive,
    });

    setBooks((prev) =>
      prev.map((book) =>
        book.id === id ? { ...book, isActive: !isActive } : book
      )
    );
  };

  const handleDelete = (id: string) => {
    removeBook(id);
  };

  return (
    <div className="dashboard">
      <div className="dashboard__filter">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="dashboard__select"
        >
          <option>Show All</option>
          <option>Show Active</option>
          <option>Show Deactivated</option>
        </select>
        <span>
          Showing {filteredBooks.length} of {books.length}
        </span>
      </div>
      <div className="dashboard__table-wrapper">
        <table className="dashboard__table">
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Author Name</th>
              <th>Category</th>
              <th>ISBN</th>
              <th>Created At</th>
              <th>Modified At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book.id} className={book.isActive ? "" : "inactive"}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>{book.isbn}</td>
                <td>{book.createdAt}</td>
                <td>{book.modifiedAt || "--"}</td>
                <td>
                  <button
                    onClick={() => handleEdit(book.id)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeactivate(book.id, book.isActive)} // передаем id и текущий статус
                    className="toggle-btn"
                  >
                    {book.isActive ? "Deactivate" : "Re-Activate"}
                  </button>
                  {!book.isActive && (
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="dashboard__add-book">
        <a href="/add" className="dashboard__link">
          Add a Book
        </a>
      </div>
      <footer className="dashboard__footer">
        <a
          href="https://github.com/YevhenHovorukha"
          target="_blank"
          rel="noopener noreferrer"
        >
          My GitHub
        </a>
      </footer>
    </div>
  );
}
