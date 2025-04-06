import { useAuth } from '../context/AuthContext';
import { usePermission } from '../hooks/usePermission';

const Dashboard = () => {
  const { user, role, logout } = useAuth();
  const { can } = usePermission();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">歡迎 {user}</h1>
      <p className="mt-2">你的角色是：{role}</p>

      <button
        className="mt-4 bg-red-500 text-white px-4 py-2"
        onClick={logout}
      >
        登出
      </button>

      <div className="mt-8 space-y-3 border-t pt-6">
        <h2 className="text-xl font-semibold">你有以下操作權限：</h2>
        {can('view') && <div>✔️ 你可以檢視資料</div>}
        {can('edit') && (
          <button className="bg-blue-500 text-white px-4 py-2">編輯</button>
        )}
        {can('delete') && (
          <button className="bg-red-500 text-white px-4 py-2">刪除</button>
        )}
        {can('approve') && (
          <button className="bg-green-500 text-white px-4 py-2">審核</button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
