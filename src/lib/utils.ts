import { Timestamp } from "firebase/firestore";

export const formatDate = (timestamp: Timestamp): string => {
    if (timestamp && timestamp.toDate) {
      return timestamp.toDate().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    }
    return 'Unknown date';
  };