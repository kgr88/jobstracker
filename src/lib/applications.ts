import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, where, query, Timestamp } from 'firebase/firestore';
import { Application, ApplicationForm } from '../../types';


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

export async function createApplication(userId: string, data: ApplicationForm){
    const applicationData = {
        ...data,
        userId,
        dateApplied: Timestamp.now()
    };
    
    const docRef = await addDoc(collection(db, 'applications'), applicationData);

    return{
        id: docRef.id,
        ...applicationData
    }
}
