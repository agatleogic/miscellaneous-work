import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Profile from "./components/Profile";
import CreateQuote from "./components/CreateQuote";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import OtherUserProfile from "./components/OtherUserProfile";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<CreateQuote />} />
        <Route path="/profile/:id" element={<OtherUserProfile />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
