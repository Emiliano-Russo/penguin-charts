import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import React from 'react';
import { Home } from "./pages/Home";
import { DatePick } from "./pages/DatePick";
import { Users } from "./pages/Users";
import { Chart } from "./pages/Chart";


function App() {
  return (
    <div className="App">
      <h1>Penguin Charts</h1>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/users" element={<Users/>}/>
          <Route path="/date" element={<DatePick/>}/>
          <Route path="/chart" element={<Chart/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
