import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { LeaveStatus } from 'src/app/shared/global/leave-status';
import { LeaveTypes } from 'src/app/shared/global/leave-types';
import { TokenService } from 'src/app/user-management/login/services/token.service';
import { LeaveRequestComponent } from '../../leave-request/leave-request.component';
import { LeaveApplication } from '../../models/leave-application';
import { LeaveService } from '../../services/leave.service';

@Component({
  selector: 'app-trainee',
  templateUrl: './trainee.component.html',
  styleUrls: ['./trainee.component.css']
})
export class TraineeComponent implements OnInit {
editLeave(_t41: LeaveApplication) {
throw new Error('Method not implemented.');
}


  modalDialog: MdbModalRef<LeaveRequestComponent> | null = null;
  leaveApplications: LeaveApplication[] = [];
  user: any;
  leaveBalances: any[] = [];
  dataSet: any;
  events: any[] =[];
  eventCardTitle: string = '';

  constructor(
    private modalService: MdbModalService,
    private toastr: ToastrService,
    private leaveService: LeaveService,
    private tokenService: TokenService,
  ) { }

  ngOnInit(): void {
    
   // Populate leaveBalances with mock data
   this.populateLeaveBalances();
  }
  populateLeaveBalances() {
    // Example mock data
    const mockLeaveBalances = [
      { balanceType: 'Annual', used: 5, remaining: 15 },
      { balanceType: 'Sick', used: 3, remaining: 7 },
      { balanceType: 'Family_Responsibility', used: 0, remaining: 10 }
      // Add more mock data as needed
    ];
    // Assign the mock data to leaveBalances
    this.leaveBalances = mockLeaveBalances;
    const mockLeaveApplications: LeaveApplication[] = [
      { 
        id: 1,
        name: 'John', 
        surname: 'Doe', 
        userName: 'john.doe', 
        sponsorName: 'Sponsor A', 
        leaveType: 'Annual', 
        startDate: new Date('2024-03-01'), 
        endDate: new Date('2024-03-05'), 
        status: 'Pending', 
        comments: 'Pending approval', 
        milestone: 'Initial submission' 
      },
      { 
        id: 2,
        name: 'Jane', 
        surname: 'Doe', 
        userName: 'Boitumelo', 
        sponsorName: 'Sponsor B', 
        leaveType: 'Sick', 
        startDate: new Date('2024-03-10'), 
        endDate: new Date('2024-03-12'), 
        status: 'Approved', 
        comments: 'Approved by manager', 
        milestone: 'Final approval' 
      },
      {
        id: 3,
        name: 'John',
        surname: 'Smith',
        userName: 'Boitumelo',
        sponsorName: 'Sponsor C',
        leaveType: 'Family_Responsibility',
        startDate: new Date('2024-03-15'),
        endDate: new Date('2024-03-17'),
        status: 'Pending',
        comments: 'Pending approval',
        milestone: 'Initial submission'
      }
      // Add more mock data as needed
    ];

    // Assuming the logged-in user's username is stored in a variable called loggedInUsername
    // Filter the mock data array to include only applications for the logged-in user
    this.leaveApplications = mockLeaveApplications.filter(application => application.userName === "Boitumelo");
  }
  getLeaveBalances(userId: any) {
    this.leaveService.getLeaveBalances(userId)
      .subscribe((response: any) => {
        this.leaveBalances = response;
      });
  }

  getLeaveApplication(userId: any) {
    this.leaveService.getLeaveApplications(userId)
      .subscribe(arg => {
        this.leaveApplications = arg;
      });
  }

  openDialog() {
    this.modalDialog = this.modalService.open(LeaveRequestComponent,
       {
      animation: true,
      backdrop: true,
      containerClass: 'modal top fade modal-backdrop',
      // data: { leaveBalances: leaveBalances },
      ignoreBackdropClick: false,
      keyboard: true,
      modalClass: 'modal-xl modal-dialog-centered',
    }
    );

    this.modalDialog.onClose.subscribe((isUpdated: boolean) => {
      if (isUpdated) {
        this.getLeaveApplication(this.user?.id);
        this.getLeaveBalances(this.user?.id);
      }
    });
  }

  cancelApplication(leave: any) {
    // Cancl leave here
    leave.status = LeaveStatus.Cancelled;

    this.leaveService.updateLeave(leave)
      .subscribe(_ => {
        this.getLeaveApplication(this.user?.id);
        this.getLeaveBalances(this.user?.id);
      });

  }

  setData(used: number, remaining: number) {
    this.dataSet = { used, remaining };
  }

  getPrimaryColor(balanceType: LeaveTypes) {
    switch (balanceType) {
      case LeaveTypes.Annual:
        return '#2d572b';
      case LeaveTypes.Sick:
        return '#2d2b57';
      case LeaveTypes.Family_Responsibility:
        return '#2a5d6b';
    }
    return balanceType;
  }

  getStatusIcon(status: any): any {
    switch (status) {
      case LeaveStatus.Pending:
        return 'fa-circle-pause'
      case LeaveStatus.Approved:
        return 'fa-circle-check green-text'
      case LeaveStatus.Partially_Approved:
        return 'fa-circle-half-stroke g4l-green'
      case LeaveStatus.Cancelled:
        return 'fa-ban red-text'
      case LeaveStatus.Rejected:
        return 'fa-circle-xmark red-text'
      default:
        break;
    }
  }

}
