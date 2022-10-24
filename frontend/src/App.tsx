import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Users from "./components/Users";
import UserCreate from "./components/UserCreate";
import Home from "./components/Home";
import LogIn from "./components/LogIn";

export default function App() {
  // const [token, setToken] = React.useState<string | null>();
  const token: string | null = localStorage.getItem("token"); // ตัวแปร token จะดึงค่า token ที่อยู่ใน local storage

  // useEffect(() => {
  //   setToken();
  // }, []);

  
  // ถ้า local storage ไม่มี token หรือ ตัวแปร token เป็น null จะสามารถเข้าถึง path Home, Log in และ UserCreate ได้
  if (!token) {
    return (
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            {/* <Route path="/create" element={<UserCreate />} /> */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        
      </Router>
    );
  }


  // ถ้า local storage มี token หรือ ตัวแปร token ไม่เป็น null จะสามารถเข้าถึง path Home, Users
  return (
    <Router>
    <div>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<Users />} />
        <Route path="/create" element={<UserCreate />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
    </Router>
  );
}