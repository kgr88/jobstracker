import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, where, query, orderBy, writeBatch, doc, updateDoc } from 'firebase/firestore';
import { Application, ApplicationForm } from '../../types';

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

export async function deleteApplication(applicationId: string, userId: string) {
  const batch = writeBatch(db);
  const applicationDocRef = doc(db, 'applications', applicationId);
  batch.delete(applicationDocRef);

  const interviewsQuery = query(
    collection(db, 'interviews'),
    where('applicationId', '==', applicationId),
    where('userId', '==', userId)
  );

  const interviewsSnapshot = await getDocs(interviewsQuery);
  const interviewCount = interviewsSnapshot.size;

  interviewsSnapshot.forEach(interviewDoc => {
    batch.delete(interviewDoc.ref);
  });

  await batch.commit();
  return { deletedInterviews: interviewCount };
}

export async function updateApplicationStatus(applicationId: string, status: string) {
  const docRef = doc(db, 'applications', applicationId);
  await updateDoc(docRef, { status });
}
