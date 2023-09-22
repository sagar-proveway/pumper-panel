import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";
import axios from "axios";

export default function Layout() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const validateUser = async () => {
    try {
      await axios.post(
        "/api/user/validateUser",
        {},
        {
          withCredentials: true,
        }
      );

      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    validateUser();
  }, []);

  return (
    <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
      <Sidebar />
      <div className="flex flex-col flex-1">
        {isAuthenticated ? <Outlet /> : <Navigate to="/login" />}
      </div>
    </div>
  );
}
