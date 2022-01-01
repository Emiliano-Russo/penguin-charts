import "./App.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { DatePick } from "./pages/DatePick";
import { Users } from "./pages/Users";
import { Chart } from "./pages/Chart";
import "antd/dist/antd.css";

function App() {
  return (
    <div>
      <header className="Header">
        <h1>Penguin Charts</h1>
      </header>
      <div className="App">
        <div style={{ marginBottom: "10rem" }}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<Users />} />
              <Route path="/date" element={<DatePick />} />
              <Route path="/chart" element={<Chart />} />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
