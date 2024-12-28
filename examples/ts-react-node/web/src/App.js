import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import PaymentCallback from "./Callback";

const App = () => {
  return (
    <Router>
      <div>
        <header>
          <nav style={{ padding: "10px", textAlign: "center" }}>
            <a href="/" style={{ margin: "10px" }}>Home</a>
          </nav>
        </header>
        <main>
          <Routes>
            {/* Home Page Route */}
            <Route path="/" element={<HomePage />} />
            
            {/* Callback Page Route */}
            <Route path="/callback" element={<PaymentCallback />} />
          </Routes>
        </main>
        <footer style={{ textAlign: "center", marginTop: "20px" }}>
          <p>&copy; {new Date().getFullYear()} Your Company Name</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
