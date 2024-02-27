import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../services/leave.service';

@Component({
  selector: 'app-total-pending-approval-rejection',
  templateUrl: './total-pending-approval-rejection.component.html',
  styleUrls: ['./total-pending-approval-rejection.component.css']
})
export class TotalPendingApprovalRejectionComponent implements OnInit {
  allRequests: any;
  pending: number = 0;
  approved: number = 0;
  rejected: number = 0;
  cancelled: number = 0;
  constructor(private _leaveService: LeaveService) { }

  ngOnInit() {
    this.getAllLeaveApplications();
  }
  getAllLeaveApplications() {
    this._leaveService.getAllLeaveApplications().subscribe((requests) => {
      this.allRequests = requests;
      this.allRequests.forEach((x: any) => {
        if (x.status == "Approved") {
          this.approved += 1;
          

        } else if (x.status == "Pending") {
          this.pending += 1;
        }
        else if (x.status == "Rejected") {
          this.rejected += 1;
        } else if (x.status == "Cancelled") {
          this.cancelled += 1;
        }
        console.log(this.allRequests);
      })
    })
  }

}
