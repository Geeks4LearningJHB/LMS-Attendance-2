import { SponsorService } from 'src/app/user-management/services/sponsor.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { constants } from 'src/app/shared/global/global.constants';
import { HalfDaySchedule } from 'src/app/shared/global/half-day-schedule';
import { LeaveDayType } from 'src/app/shared/global/leave-day-type';
import { LeaveStatus } from 'src/app/shared/global/leave-status';
import { LeaveTypes } from 'src/app/shared/global/leave-types';
import { Roles } from 'src/app/shared/global/roles';
import { TokenService } from 'src/app/user-management/login/services/token.service';
import { LeaveService } from '../services/leave.service';
import { UserService } from 'src/app/user-management/services/user.service';

@Component({
  selector: 'app-leave-review',
  templateUrl: './leave-review.component.html',
  styleUrls: ['./leave-review.component.css']
})
export class LeaveReviewComponent implements OnInit {

  formModel: any;
  userId: any;
  daysAvailable: number | undefined = 0;
  daysRemaining: number = 0;

  keys = Object.keys;

  leaveTypes = LeaveTypes;
  daysType = LeaveDayType;
  halfDaySchedule = HalfDaySchedule;

  negativeDays: boolean = false;

  leaveBalances: any[] = [];
  request: any = {};
  role: string | null = '';
  sponsor: any;

  trainers: any[] = [];

  constructor(
    public modalRef: MdbModalRef<LeaveReviewComponent>,
    private formBuilder: UntypedFormBuilder,
    private leaveService: LeaveService,
    private sponsorService: SponsorService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    let user: any = this.tokenService.getDecodeToken();
    this.userId = user.id;
    this.role = sessionStorage.getItem(constants.role);
    this.getSponsor(this.request?.userId);
    this.getTrainers();
    this.buildForm(this.request);
    this.setleaveSchedule();
    this.setApprovers();
    this.setDocuments();
  }

  getTrainers() {
    this.userService.getUsersByRole(Roles.Trainer)
      .subscribe((users: any) => {
        this.trainers = users;
      });
  }

  buildForm(request: any) {
    this.formModel = this.formBuilder.group({
      id: [request?.id],
      userId: [request?.userId],
      leaveType: [ { value: request?.leaveType , disabled: true }, Validators.required],
      startDate: [request?.startDate, Validators.required],
      endDate: [request?.endDate, Validators.required],
      leaveDayDuration: [ LeaveDayType.All_day ],
      leaveSchedule: request?.leaveSchedule,
      comments: [ { value: request?.comments, disabled: true } ],
      usedDays: [request?.usedDays, Validators.required ],
      status: [ request?.status ],
      approvers: this.formBuilder.array([]),
      documents: this.formBuilder.array([])
    });
  }

  getSponsor(userId: any) {
    this.sponsorService.getSponsorByUserId(userId)
    .subscribe((response: any) => {
      this.sponsor = response;
    });
  }

  setleaveSchedule() {
    if (this.request.leaveSchedule) {
      this.request?.leaveSchedule
      .forEach((day: any) => {
        this.formModel.get('leaveSchedule').push(this.leaveSchedule(day));
      });
    }
  }

  setApprovers() {
    if (this.request.approvers) {
      this.request?.approvers
      .sort((a: any, b: any) => b.role.localeCompare(a.role))
      .forEach((approver: any) => {
        this.formModel.get('approvers').push(this.approver(approver));
      });
    }
  }

  setDocuments() {
    if (this.request.documents) {
      this.request?.documents.forEach((document: any) => {
        this.formModel.get('documents').push(this.document(document));
      });
    }
  }

  leaveSchedule(data?: any) {
    return this.formBuilder.group({
      date: [data?.date, Validators.required],
      leaveDayType: [LeaveDayType.Half_day],
      halfDaySchedule: [HalfDaySchedule.Afternoon_Hours],
      usedDays: [0.5, Validators.required]
    });
  }

  approver(approver: any): any {
    return this.formBuilder.group({
      id: [approver?.id, Validators.required],
      leaveId: [approver?.leaveId, Validators.required],
      userId: [approver?.userId, Validators.required],
      fullName: [approver?.fullName, Validators.required],
      role: [approver?.role, Validators.required],
      status: [approver?.status, Validators.required],
      comments: [approver?.comments, Validators.required],
    });
  }

  document(fileUpload: any | null) {
    return this.formBuilder.group({
      id: [fileUpload?.id, Validators.required],
      fileName: [fileUpload?.fileName, Validators.required],
      filePath: [fileUpload?.filePath, Validators.required]
    });
  }

  calculateUsedDays() {
    const form = this.formModel.get('leaveSchedule').value;
    return form.reduce((a: any, b: any) => a + b.usedDays, 0);
  }

  // Start
  getLeaveBalance(leaveType: any) {
    return this.request?.leaveBalances.find((x: any) => x.balanceType === leaveType);
  }

  saveChangeOfApprover() {
    let leaveId = this.formModel.get('id').value;
    let approvers = this.formModel.get('approvers').value;

    this.leaveService.updateApprover(leaveId, approvers).subscribe((_: any) => {
      this.toastr.success(`Approving trainer successfully updated.`);
      this.modalRef.close(true);
    });
  }

  updateLeaveStatus(status: any) {
    var form: any;
    this.formModel.markAllAsTouched();

    switch (this.role) {
      case Roles.Admin:
        form = this.formModel.get('approvers').at(1);
        break;
      case Roles.Trainer:
        form = this.formModel.get('approvers').at(0);
        break;
      default:
        break;
    }

    form.get('status').patchValue(status);
    this.updateStatusOnTheRequest();

    if (this.formModel.invalid) {
      return;
    }

    this.leaveService.updateLeaveRequest(this.formModel.value).subscribe(_ => {
      this.toastr.success(`Leave request successfully updated.`);
      this.modalRef.close(true);
    });
  }
  updateStatusOnTheRequest() {
    const trainerForm = this.formModel.get('approvers').at(0);
    const adminForm = this.formModel.get('approvers').at(1);

    const responseFromTrainer = trainerForm.get('status').value;
    const responseFromAdmin = adminForm.get('status').value;

    trainerForm.get('comments').setValidators(null);
    adminForm.get('comments').setValidators(null);
    trainerForm.get('comments').updateValueAndValidity();
    adminForm.get('comments').updateValueAndValidity();

    if (responseFromAdmin === LeaveStatus.Approved && responseFromTrainer === LeaveStatus.Approved) {
      this.formModel.get('status').patchValue(LeaveStatus.Approved);
    } else if ((responseFromAdmin === LeaveStatus.Pending && responseFromTrainer === LeaveStatus.Approved)
      || (responseFromAdmin === LeaveStatus.Approved && responseFromTrainer === LeaveStatus.Pending)) {
      this.formModel.get('status').patchValue(LeaveStatus.Partially_Approved);
    } else if ((responseFromAdmin === LeaveStatus.Rejected || responseFromTrainer === LeaveStatus.Rejected)) {
      this.formModel.get('status').patchValue(LeaveStatus.Rejected);
      switch (this.role) {
        case Roles.Trainer:
          if (trainerForm.get('comments').value === '') {
            trainerForm.get('comments').setValidators(Validators.required);
            trainerForm.get('comments').updateValueAndValidity();
          }
          break;
        case Roles.Admin:
          if (adminForm.get('comments').value === '') {
            adminForm.get('comments').setValidators(Validators.required);
            adminForm.get('comments').updateValueAndValidity();
          }
          break;
        default:
          break;
      }
    }
  }

  proposeChanges() {

  }

  openOnNewTab(link: any) {
    window.open(link, '_blank');
  }

  getStatusBgColor(status: any): any {
    switch (status) {
      case LeaveStatus.Pending:
        return 'bg-5-g4l-orange'
      case LeaveStatus.Approved:
        return 'bg-5-green'
      case LeaveStatus.Partially_Approved:
        return 'bg-5-g4l-greeny-blue'
      case LeaveStatus.Cancelled:
        return 'bg-5-red'
      case LeaveStatus.Rejected:
        return 'bg-5-red'
      default:
        break;
    }
  }

  getStatusIcon(status: any): any {
    switch (status) {
      case LeaveStatus.Pending:
        return 'fa-circle-pause g4l-orange-text'
      case LeaveStatus.Approved:
        return 'fa-circle-check green-text'
      case LeaveStatus.Partially_Approved:
        return 'fa-circle-half-stroke g4l-greeny-blue-text'
      case LeaveStatus.Cancelled:
        return 'fa-ban red-text'
      case LeaveStatus.Rejected:
        return 'fa-circle-xmark red-text'
      default:
        break;
    }
  }

  getFileIcon(fileName: any) {
    if (fileName.toLowerCase().includes('.pdf')) {
      return "fa-file-pdf";
    } else if (fileName.toLowerCase().includes('.png')
    || fileName.toLowerCase().includes('.jpeg')
    || fileName.toLowerCase().includes('.jpg')) {
      return "fa-file-image";
    } else {
      return "fa-file";
    }
  }

  getFormControl(form: any, formControlName: string): any {
    return form.controls[formControlName];
  }

  isAllowedToViewAll(role: any) {
    if (role === this.role || this.role === Roles.Admin) {
      // if (this.role === Roles.Admin) {
      //   const form = this.formModel.get('approvers').at(0);
      //   // form.get('comments').disable();
      // }
      return true;
    } else {
      return false;
    }
  }

  isTrainer(role: string | null) {
    switch (role) {
      case Roles.Trainer:
        return true;
      default:
        return false;
    }
  }

  setNewApprover() {
    let approverForm = this.formModel.get('approvers').at(0) as UntypedFormGroup;
    let trainer = this.trainers.find(x => x.id === approverForm.get('userId')?.value);
    approverForm.controls['fullName'].setValue(`${trainer?.name} ${trainer?.surname}`);
}

  close() {
    this.modalRef.close();
  }

}

