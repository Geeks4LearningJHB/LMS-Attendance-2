import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
// import { AttendanceStatus } from 'src/app/attendance-register/models/attendance-type';
import { UserService } from 'src/app/user-management/services/user.service';
import { AttendanceService } from '../../services/attendance.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  attendences: any[] = [];
  users: any;
  ids: any;
  testing: UntypedFormGroup = new UntypedFormGroup({});
  date: any;
  // testing data

  constructor(
    private formBuider: UntypedFormBuilder,
    private attendenceService: AttendanceService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getAttendences(0, 10);
    this.date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, -1);
  }
  getAttendences(skip: any, take: any) {
    this.attendenceService
      .getPagedAttendance(skip, take)
      .subscribe((res: any) => {
        this.attendences = res;
        console.log(this.attendences, 'attendances');
      });
    this.userService.getPagedUsers(skip, take).subscribe((res: any) => {
      res.forEach((element: any) => {
        if (element.role == 'Learner') {
          this.ids = element.id;
          this.testing = this.formBuider.group({
            userId: [element.id],
            date: [this.date],
            status: ['Absent'],
          });
          this.attendenceService
            .captureDetails(this.testing.value)
            .subscribe((_) => {});
          console.log(this.testing.value);
          console.log(this.ids);
        }
      });
      this.users = res;
    });
  }

  getStatus(status: any): any {
    return status.toLowerCase();
  }
}
