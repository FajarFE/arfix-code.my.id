import React, { useEffect } from "react";
import Sidebar from "../Micros/Sidebar";
import FormArtikel from "../Micros/FormArtikel";
import { Outlet, useNavigate } from "react-router-dom";
import LibraryArtikel from "../Micros/LibraryArtikel";
import axios from "axios";
import jwtDecode from "jwt-decode";

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = React.useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`, // Set header Authorization dengan token JWT
        },
      });
      setUser(response.data.user);
      console.log(response.data.user);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        handleTokenExpired(); // Memproses jika token JWT kadaluarsa
      }
    }
  };

  const isTokenExpired = (token) => {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      return true; // Token kadaluarsa
    }
    return false; // Token masih berlaku
  };

  const handleTokenExpired = () => {
    localStorage.removeItem("token"); // Menghapus token dari local storage
    navigate("/login"); // Redirect ke halaman login
  };

  const handleLogout = async () => {
    try {
      if (isTokenExpired(token)) {
        handleTokenExpired(); // Memproses jika token JWT kadaluarsa
      }

      await axios.get("http://localhost:8000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`, // Set header Authorization dengan token JWT
        },
      });

      localStorage.removeItem("token");
      window.location.reload(); // Refresh halaman setelah logout
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className="flex justify bg-white" style={{ width: "100%", height: "100vh" }}>
        <Sidebar user={user} token={token} logout={handleLogout} />
        <Outlet />
      </section>
    </>
  );
};

export default Dashboard;
