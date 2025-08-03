import { db } from '@/lib/firebase';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { Application } from '../../types';


export async function fetchApplications(userId: string){
    const applicationsRef = collection(db, 'applications');
    const applicationsQuery = query(applicationsRef, where('userId', '==', userId))
    const querySnap = await getDocs(applicationsQuery);

    const applications: Application[] = [];
    querySnap.forEach((doc) => {
        applications.push({
            ...(doc.data() as Omit<Application, 'id'>),
            id: doc.id
        });
    });
    
    return applications;
}

