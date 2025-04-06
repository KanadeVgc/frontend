import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ADMIN_KEY = 'admin2024';
const COMPANY_KEY = 'company2024';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'company' | 'customer'>('customer');
  const [internalKey, setInternalKey] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!username || !password) return alert('帳號與密碼不可空白');

    // 驗證內部KEY
    if (role === 'admin' && internalKey !== ADMIN_KEY) {
      return alert('管理員註冊需要正確的內部KEY');
    }
    if (role === 'company' && internalKey !== COMPANY_KEY) {
      return alert('公司註冊需要正確的內部KEY');
    }

    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[username]) return alert('此帳號已被註冊');

    // 儲存帳號
    users[username] = { password, role };
    localStorage.setItem('users', JSON.stringify(users));

    alert('註冊成功，請登入');
    navigate('/login');
  };

  return (
    <div className="p-10 flex flex-col items-center justify-center bg-gray-50 h-screen">
      <h2 className="text-2xl font-bold mb-4">註冊新帳號</h2>

      <input
        className="border p-2 mb-2 w-64"
        placeholder="使用者名稱"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="border p-2 mb-2 w-64"
        placeholder="密碼"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value as any)}
        className="border p-2 mb-2 w-64"
      >
        <option value="customer">客戶</option>
        <option value="company">公司帳戶</option>
        <option value="admin">管理員</option>
      </select>

      {role !== 'customer' && (
        <input
          className="border p-2 mb-4 w-64"
          placeholder="內部 KEY"
          value={internalKey}
          onChange={(e) => setInternalKey(e.target.value)}
        />
      )}

      <button
        className="bg-green-600 text-white px-4 py-2 w-64"
        onClick={handleRegister}
      >
        註冊
      </button>
    </div>
  );
};

export default Register;
