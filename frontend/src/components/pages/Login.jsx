import React, { useState, useContext } from 'react';
import { Edit } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3456/login', credentials);
      if (res.data) {
        login(res.data.token);
        toast.success('Login successful!');
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      toast.error('Invalid credentials!');
    }
  };

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-amber-50 py-10 min-h-screen flex justify-center items-center">
      <div className="bg-white bg-opacity-90 backdrop-blur-lg border border-amber-100 p-8 rounded-xl shadow-xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 flex items-center justify-center mb-6">
          <Edit className="text-amber-500 mr-2" size={24} /> Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full p-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full p-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-amber-500 text-white font-semibold py-2 rounded-lg flex items-center justify-center hover:bg-amber-600 transition duration-200"
            >
              <Edit className="mr-2" size={18} /> Login
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
