import { Timestamp } from "firebase/firestore";

export const formatDate = (timestamp: Timestamp): {date: string, time: string} => {
   if (timestamp && timestamp.toDate) {
    const date = timestamp.toDate();
    const dateStr = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    const timeStr = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: false,
    });
    return { date: dateStr, time: timeStr };
    }
    return { date: 'Unknown date', time: 'Unknown time' };
  };

  export const getHostname = (url: string) => {
  const matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
  return matches && matches[1];
}