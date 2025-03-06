import { createRoot } from "react-dom/client";

import App from "./App.tsx";

import { BooksProvider } from "@context/BooksProvider.tsx";

import "./index.scss";

createRoot(document.getElementById("root")!).render(
  <BooksProvider>
    <App />
  </BooksProvider>
);
