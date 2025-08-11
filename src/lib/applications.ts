import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, where, query, orderBy } from 'firebase/firestore';
import { Application, ApplicationForm, } from '../../types';

export async function fetchApplications(userId: string) {
  const applicationsRef = collection(db, 'applications');
  const applicationsQuery = query(applicationsRef, where('userId', '==', userId), orderBy('dateApplied', 'desc'));
  const querySnap = await getDocs(applicationsQuery);

  const applications: Application[] = [];
  querySnap.forEach(doc => {
    applications.push({
      ...(doc.data() as ApplicationForm),
      id: doc.id,
    });
  });

  return applications;
}

export async function createApplication(data: ApplicationForm) {
  const applicationData = {
    ...data,
  };

  await addDoc(collection(db, 'applications'), applicationData);
}
