import "./App.css";
import Email from "./Components/Email";
import Login from "./Components/Login";
import Phone from "./Components/Phone";
import Register from "./Components/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dash from "./Dashboard/Dash";
import Shops from "./Dashboard/Shops";
import Search from "./Dashboard/Search";
import Category from "./Dashboard/Category";
import Users from "./Dashboard/Users";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/email" element={<Email />} />
          <Route path="/phone" element={<Phone />} />
          <Route path="/dashboard" element={<Dash />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/search" element={<Search />} />
          <Route path="/category" element={<Category />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
