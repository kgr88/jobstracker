'use client';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <ProtectedRoute>
      <div>{user?.email}</div>
      <button onClick={logout} className="bg-red-600 text-white px-4 py-2 ">
        Logout
      </button>
    </ProtectedRoute>
  );
}
