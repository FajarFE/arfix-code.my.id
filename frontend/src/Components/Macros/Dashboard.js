// 1. Impor useCallback dan useState
import React, { useEffect, useCallback, useState } from 'react';
import Sidebar from '../Micros/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [user, setUser] = useState({}); // Menggunakan useState, bukan React.useState
  const baseURL = `${window.location.protocol}//${window.location.hostname}:8000`;

  // Helper untuk menangani token kadaluarsa, dibungkus useCallback
  const handleTokenExpired = useCallback(() => {
    localStorage.removeItem('token');
    navigate('/login');
  }, [navigate]); // Dependensi: navigate

  // 2. Bungkus fetchData dengan useCallback
  const fetchData = useCallback(async () => {
    // Jika tidak ada token, langsung redirect tanpa mencoba fetch
    if (!token) {
      handleTokenExpired();
      return;
    }

    try {
      const response = await axios.get(`${baseURL}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.user);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        handleTokenExpired(); // Memproses jika token JWT kadaluarsa
      }
    }
  }, [token, baseURL, handleTokenExpired]); // 3. Tambahkan dependensi untuk useCallback

  // 4. useEffect sekarang memiliki dependensi yang stabil dan benar
  useEffect(() => {
    fetchData();
  }, [fetchData]); // Peringatan akan hilang

  // Bungkus handleLogout juga untuk konsistensi
  const handleLogout = useCallback(async () => {
    if (!token) return; // Tidak melakukan apa-apa jika sudah logout

    // Tidak perlu lagi memanggil API untuk logout, cukup hapus token di client-side
    // Kecuali jika backend Anda punya endpoint untuk mem-blacklist token
    try {
      // Panggilan API ini bisa jadi opsional, tergantung kebutuhan backend
      await axios.post(
        `${baseURL}/api/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    } catch (error) {
      console.error(
        'Logout API call failed, but proceeding with client-side logout.',
        error,
      );
    } finally {
      // Selalu hapus token dan redirect
      localStorage.removeItem('token');
      navigate('/login');
      // window.location.reload(); // Menggunakan navigate lebih disarankan daripada reload
    }
  }, [token, baseURL, navigate]);

  return (
    <section
      className="flex bg-white"
      style={{ width: '100%', height: '100vh' }}
    >
      <Sidebar user={user} logout={handleLogout} />
      <Outlet context={{ user }} />{' '}
      {/* Opsional: Melewatkan user ke child routes via context */}
    </section>
  );
};

export default Dashboard;
