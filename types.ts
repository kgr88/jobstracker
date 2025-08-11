import { Timestamp } from 'firebase/firestore';

export interface Application{
    id: string;
    userId: string;
    company: string;
    position: string;
    location: string;
    status: 'Applied' | 'Interview' | 'Rejected' | 'Offer';
    dateApplied: Timestamp;
    postingUrl: string;
    notes: string;
}

export type ApplicationForm = Omit<Application, 'id'>

export interface Interview{
    id: string;
    applicationId: string,
    userId: string,
    interviewDate: Timestamp;
}

export type InterviewForm = Omit<Interview, 'id'>
