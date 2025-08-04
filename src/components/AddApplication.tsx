'use client';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createApplication } from '@/lib/applications';
import { ApplicationForm } from '../../types';

interface AddApplicationProps {
  isOpen: boolean;
  onClose: () => void;
  onApplicationAdded: () => void;
}

export default function AddApplication({ isOpen, onClose, onApplicationAdded }: AddApplicationProps) {
  const [formData, setFormData] = useState<ApplicationForm>({
    company: '',
    position: '',
    location: '',
    status: 'Applied',
    postingUrl: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      await createApplication(user.uid, formData);
      setFormData({
        company: '',
        position: '',
        location: '',
        status: 'Applied',
        postingUrl: '',
        notes: '',
      });
      onClose();
      onApplicationAdded(); // Refresh the applications list
    } catch (error) {
      console.error('Error adding application:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-gray-900">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Application</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Company</label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={e => setFormData({ ...formData, company: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Google, Microsoft, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Position</label>
            <input
              type="text"
              required
              value={formData.position}
              onChange={e => setFormData({ ...formData, position: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Frontend Developer, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={e => setFormData({ ...formData, location: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Kraków, Remote, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value as ApplicationForm['status'] })}
              className="w-full p-2 border rounded">
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Job Posting URL</label>
            <input
              type="url"
              value={formData.postingUrl}
              onChange={e => setFormData({ ...formData, postingUrl: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
              className="w-full p-2 border rounded h-20"
              placeholder="Additional notes..."
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50">
              {loading ? 'Adding...' : 'Add Application'}
            </button>
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-50">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
