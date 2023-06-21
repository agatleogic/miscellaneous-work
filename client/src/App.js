import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import InputTodo from "./components/InputTodo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InputTodo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
