import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "@pages/dashboard/Dasboard";
import AddBookPage from "@pages/addBookPage/AddBookPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddBookPage />} />
        <Route path="/add/:id" element={<AddBookPage />} />
      </Routes>
    </Router>
  );
};

export default App;
