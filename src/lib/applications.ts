import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, doc, where, query } from 'firebase/firestore';
import { Application, ApplicationForm, InterviewForm } from '../../types';


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

export async function createApplication(data: ApplicationForm){
    const applicationData = {
        ...data
    };
    
    await addDoc(collection(db, 'applications'), applicationData);
}

  export async function createInterview(data: InterviewForm){
    const interviewData = {
        ...data,
    };
    await addDoc(collection(db, 'interviews'), interviewData);

    const applicationsRef = doc(db, 'applications', data.applicationId)
    await updateDoc(applicationsRef,{
        status: 'Interview'
    });

  }

