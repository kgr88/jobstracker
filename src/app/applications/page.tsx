'use client';
import { useState } from 'react';
import { useApplications } from '@/hooks/useApplications';
import AddApplication from '@/components/AddApplication';
import { formatDate } from '@/lib/utils';
import {Button} from '@heroui/button'; 

export default function Applications() {
  const { applications, loading, error, refetch } = useApplications();
  const [showAddApplication, setShowAddApplication] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Job Applications</h1>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setShowAddApplication(true)}
                >
                + Add Application
              </Button>
            </div>
          </div>
        </div>
      </header>
      <div>
        <h2>Applications ({applications.length})</h2>
        <div className="p-4 bg-gray-900 rounded-md">
          {applications.map(app => (
            <div key={app.id} className="bg-gray-400 rounded-sm">
              <h3>
                {app.position} at {app.company}
              </h3>
              <p>Status: {app.status}</p>
              <p>Applied: {formatDate(app.dateApplied)}</p>
            </div>
          ))}
        </div>
      </div>
      <AddApplication
        isOpen={showAddApplication}
        onClose={() => setShowAddApplication(false)}
        onApplicationAdded={() => {
          refetch(); // Refresh applications list
        }}
      />
    </div>
  );
}
