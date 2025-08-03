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