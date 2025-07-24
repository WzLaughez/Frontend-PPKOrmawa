import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

import { FiEye, FiEyeOff } from 'react-icons/fi';
import axiosInstance from './lib/axios';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('user'); // default: user
  const {login} = useAuth(); // Assuming useAuth is imported from AuthContext
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const apiUrl =
      role === 'admin'
        ? '/admin/login'
        : '/login';

    const res = await axiosInstance.post(apiUrl, {
      
        [role === 'admin' ? 'username' : 'nik']: identifier,
      password,
    });

    const data = res.data;

    localStorage.setItem('token', data.token);
    login({ token: data.token, role, user: data.user });

    navigate(`/${role}`);
  } catch (err) {
    alert('Login gagal. Periksa username dan password.');
    console.error(err);
  }
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="absolute top-6 left-6 text-3xl font-bold text-[#005b94]">PrimaHealth</div>
      
      <div className="bg-white shadow-lg w-full max-w-md p-10 border rounded-md z-10">
        <h2 className="text-2xl font-bold text-center mb-2">Log In to PrimaHealth</h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Quick & Simple way to Automate your payment
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selector */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">LOGIN AS</label>
            <select
              className="w-full border border-gray-400 px-3 py-2"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {/* Username or NIK */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              {role === 'admin' ? 'USERNAME' : 'NIK'}
            </label>
            <input
              type="text"
              className="w-full border border-gray-400 px-3 py-2"
              placeholder={role === 'admin' ? 'admin123' : '1234567890'}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>
            {/* Password */}
          <div className="relative">
            <label className="block text-xs text-gray-500 mb-1">PASSWORD</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full border border-gray-400 px-3 py-2 focus:outline-none"
              placeholder="***********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-8 text-gray-500 text-sm"
              onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? <FiEyeOff /> : <FiEye />}

            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 font-medium hover:bg-gray-800 transition"
          >
            PROCEED
          </button>
        </form>
      </div>

      <div className="absolute bottom-0 w-full bg-[#005b94] text-white text-xs text-center py-2">
        © 2021 - 2025 All Rights Reserved. Qpay
      </div>
    </div>
  );
};

export default Login;
