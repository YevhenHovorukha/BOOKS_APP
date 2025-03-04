import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/:cityName" element={<h1>City name</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
