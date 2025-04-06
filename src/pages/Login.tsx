import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users') || '{}');

    if (!users[username]) {
      return alert('使用者不存在，請先註冊');
    }

    if (users[username].password !== password) {
      return alert('密碼錯誤');
    }

    login(username, users[username].role || 'customer');

    // 根據角色導向
    const role = users[username].role;
    if (role === 'admin') navigate('/admin');
    else if (role === 'company') navigate('/company');
    else navigate('/customer');
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">登入系統</h2>

      <input
        type="text"
        placeholder="帳號"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-2 border w-64 mb-2"
      />
      <input
        type="password"
        placeholder="密碼"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border w-64 mb-4"
      />

      <button className="bg-blue-500 text-white px-4 py-2" onClick={handleLogin}>
        登入
      </button>

      <p className="mt-4">
        沒有帳號？<a href="/register" className="text-blue-500 underline">前往註冊</a>
      </p>
    </div>
  );
};

export default Login;
