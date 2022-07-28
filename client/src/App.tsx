import React from "react";
import { Routes, Route } from "react-router-dom";
import ViewHome from "./views/ViewHome";
import ViewLogin from "./views/ViewLogin";
import ViewRegister from "./views/ViewRegister";
import ViewMyAccount from "./views/ViewMyAccount";
import NoMatch from "./components/NoMatch";

function App() {
  return (
    <div className="Home">
      <Routes>
        <Route path="/" element={<ViewHome />} />
        <Route path="/login" element={<ViewLogin />} />
        <Route path="/register" element={<ViewRegister />} />
        <Route path="/my-account" element={<ViewMyAccount />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;
