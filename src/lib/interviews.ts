import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, doc, where, query, orderBy } from 'firebase/firestore';
import { Interview, InterviewForm } from '../../types';

export async function fetchInterviews(userId: string) {
  const interviewsRef = collection(db, 'interviews');
  const interviewsQuery = query(interviewsRef, where('userId', '==', userId), orderBy('interviewDate', 'desc'));
  const querySnap = await getDocs(interviewsQuery);

  const interviews: Interview[] = [];
  querySnap.forEach(doc => {
    interviews.push({
      ...(doc.data() as InterviewForm),
      id: doc.id,
    });
  });

  return interviews;
}

export async function createInterview(data: InterviewForm) {
  const interviewData = {
    ...data,
  };
  await addDoc(collection(db, 'interviews'), interviewData);

  const applicationsRef = doc(db, 'applications', data.applicationId);
  await updateDoc(applicationsRef, {
    status: 'Interview',
  });
}