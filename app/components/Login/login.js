import React, { useState } from 'react';
import { FaEthereum } from 'react-icons/fa';

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/backend/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error de autenticación');
      }

      if (data.success) {
        setIsLoggedIn(true);
      }
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">
          Login
        </h2>
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
            htmlFor="username"
          >
            User
          </label>
          <input
            id="username"
            type="text"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <p className="text-red-500 text-sm mb-4">
            {error}
          </p>
        )}
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full bg-blue-500 dark:bg-blue-600 text-white p-2 rounded flex items-center justify-center transition transform duration-300 ${
            !loading && 'hover:scale-105 hover:bg-blue-600 dark:hover:bg-blue-700'
          } ${loading && 'opacity-50 cursor-not-allowed'}`}
        >
          {loading ? 'Verificando...' : <FaEthereum />}
        </button>
      </div>
    </div>
  );
}

export default Login;
