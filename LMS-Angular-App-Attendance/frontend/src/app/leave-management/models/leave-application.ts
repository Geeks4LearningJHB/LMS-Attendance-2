export interface LeaveApplication {
    id: number;
    name: string; // Add name property
    surname: string; //
    userName: string;
    sponsorName: string;
    leaveType: string;
    startDate: Date;
    endDate: Date;
    status: string;
    comments: string;
    milestone: string; // New property for milestone
  }