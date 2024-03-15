import { Time } from "@angular/common";

export type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Leave';

export type HoursType = 'Month' | 'Today' | 'Week';

export interface AttendanceModel {
  id: string;
  date: Date;
  status: AttendanceStatus;
  checkOutTime: Time;
  logInTime: Time;
  logOutTime: Time;

}

// case AttendanceStatus.Present:
//   return 'present';
// case AttendanceStatus.Absent:
//   return 'absent';
// case AttendanceStatus.Late:
//   return 'late';
// case AttendanceStatus.Leave:
//   return 'leave';
