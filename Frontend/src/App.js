import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookingFrom from "./Component/BookingFrom";
import Signup from "./Component/signup";
import Login from "./Component/login"

export default function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/register" element={<Signup />} />
        </Routes>

        <Routes>
        <Route path="/login" element={<Login />} />
        </Routes>

        <Routes>
        <Route path="/" element={<BookingFrom />} />
        </Routes>

    </BrowserRouter>
  );
}

