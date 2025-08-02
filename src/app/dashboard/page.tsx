'use client';
import { useAuth } from '@/contexts/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div>
      <div>{user?.email}</div>
      <button onClick={logout} className="bg-red-600 text-white px-4 py-2 ">
        Logout
      </button>
    </div>
  );
}
