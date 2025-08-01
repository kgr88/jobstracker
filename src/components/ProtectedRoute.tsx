'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(!loading && !user) {
            router.push('login');
        }
    },[user, loading, router]);

    if(loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    //added to remove flashing while loading
    if(!user) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="text-lg mb-2">Redirecting to login...</div>
                    <div className="text-sm text-gray-500">Please wait</div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}