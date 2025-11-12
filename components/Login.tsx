import React, { useState } from 'react';
import { AiIcon } from './Icons';

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    const trimmedUsername = username.trim();
    if (trimmedUsername) {
      onLogin(trimmedUsername);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl max-w-sm w-full">
        <AiIcon className="w-16 h-16 mx-auto mb-4 text-teal-500 dark:text-teal-400" />
        <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Please enter your username to continue.</p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white p-3 rounded-md mb-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          placeholder="Enter your username"
          aria-label="Username"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-500 transition-colors duration-200 disabled:bg-gray-400 dark:disabled:bg-gray-600"
          disabled={!username.trim()}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
