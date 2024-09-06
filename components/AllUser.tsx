import React, { useEffect, useState } from "react";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  created_at: string;
}

const CustomerManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/user");
        if (!response.ok) {
          throw new Error("Lỗi khi tải dữ liệu");
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Tên đăng nhập</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Role</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-2 border">{user.id}</td>
              <td className="px-4 py-2 border">{user.username}</td>
              <td className="px-4 py-2 border">{user.email}</td>
              <td className="px-4 py-2 border">{user.role}</td>
              <td className="px-4 py-2 border">{user.created_at}</td>
              <td className="px-4 py-2 border flex justify-evenly">
                <button className="w-[60px] h-[30px] bg-blue-500 ">View</button>
                {user.role === "user" ? (
                  <button className="w-[60px] h-[30px] bg-red-500">Khóa</button>
                ) : (
                  <button className="w-[60px] h-[30px] bg-green-500">
                    Active
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerManagement;
