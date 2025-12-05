export type AttendanceStatus = 'present' | 'late' | 'absent';

export interface AttendanceRecord {
  date: string; // '2025-01-15', etc.
  status: AttendanceStatus;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  image: string;
  attendance: AttendanceRecord[];
}
