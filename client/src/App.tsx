import React from "react";
import { Routes, Route } from "react-router-dom";
import ViewHome from "./views/ViewHome";
import ViewLogin from "./views/ViewLogin";
import ViewRegister from "./views/ViewRegister";
import Home from "./components/Home";

function App() {
  return (
    <div className="Home">
      <Routes>
        <Route path="/" element={<ViewHome />} />
        <Route path="/login" element={<ViewLogin />} />
        <Route path="/register" element={<ViewRegister />} />
      </Routes>
    </div>
  );
}

export default App;
