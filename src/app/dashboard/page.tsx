'use client';
import { useAuth } from '@/contexts/AuthContext';
import { useApplications } from '@/hooks/useApplications';
import { Timestamp } from 'firebase/firestore';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { applications, loading, error } = useApplications();

  const formatDate = (timestamp: Timestamp): string => {
    if(timestamp && timestamp.toDate){
      return timestamp.toDate().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
    return 'Unknown date';
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <div>{user?.email}</div>
      <button onClick={logout} className="bg-red-600 text-white px-4 py-2 ">
        Logout
      </button>
      <div>
        <h2>Applications ({applications.length})</h2>
        <div className='p-4 bg-gray-900 rounded-md'>
          {applications.map((app) => (
          <div key={app.id} className='bg-gray-400 rounded-sm' >
            <h3>{app.position} at {app.company}</h3>
            <p>Status: {app.status}</p>
            <p>Applied: {formatDate(app.dateApplied)}</p>
          </div>
        ))}
        </div>
        
      </div>
    </div>
  );
}
