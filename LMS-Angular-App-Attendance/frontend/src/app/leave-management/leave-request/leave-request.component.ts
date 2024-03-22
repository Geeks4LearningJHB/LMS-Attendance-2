import { SponsorService } from './../../user-management/services/sponsor.service';
import { LeaveTypes } from './../../shared/global/leave-types';
import { LeaveDayType } from './../../shared/global/leave-day-type';
import { Component, OnInit } from '@angular/core';
import { FormArray, UntypedFormBuilder, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/user-management/login/services/token.service';
import { LeaveService } from '../services/leave.service';
import { LeaveStatus } from 'src/app/shared/global/leave-status';
import { HalfDaySchedule } from 'src/app/shared/global/half-day-schedule';
import { UploadService } from '../services/upload.service';
import { FileUpload } from '../models/file-upload';
import { EventService } from '../services/event.service';
import { constants } from 'src/app/shared/global/global.constants';
import { DateFilterFn, MatCalendarCellClassFunction } from '@angular/material/datepicker';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css']
})
export class LeaveRequestComponent implements OnInit {

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
  sponsorId: any;
  leaveWithHolidays: any[] = [];
  workdays: number = 0;
  publicHolidays: number = 0;

  constructor(
    public modalRef: MdbModalRef<LeaveRequestComponent>,
    private formBuilder: UntypedFormBuilder,
    private leaveService: LeaveService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    // private uploadService: UploadService,
    private sponsorService: SponsorService,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    let user: any = this.tokenService.getDecodeToken();
    // this.userId = user.id;
    // this.getSponsor();
    this.buildForm();
  }

  buildForm() {
    this.formModel = this.formBuilder.group({
      userId: [this.userId],
      leaveType: [LeaveTypes.Please_Select_A_Leave, Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      leaveDayDuration: [ LeaveDayType.All_day ],
      leaveSchedule: this.formBuilder.array([]),
      comments: [''],
      usedDays: ['', Validators.required],
      status: [LeaveStatus.Pending],
      approvers: this.formBuilder.array([]), // How do we know who will approver
      documents: this.formBuilder.array([])
    });
  }

  getSponsor() {
    this.sponsorService.getSponsorByUserId(this.userId)
      .subscribe((response: any) => {
        this.sponsorId = response.id;
        this.getApprovers();
      }
      );
  }

  getApprovers() {
    this.sponsorService.getApproversBySponsor(this.sponsorId)
      .subscribe((response: any) => {
        response?.sort((a: any, b: any) => b?.role.localeCompare(a?.role))
          .forEach((approver: any) => {
            this.formModel.get('approvers').push(this.approver(approver));
          });
      }
      );
  }

  approver(approver: any): any {
    return this.formBuilder.group({
      userId: [approver?.id, Validators.required],
      role: [approver?.role, Validators.required],
      status: [LeaveStatus.Pending, Validators.required],
      comments: [''],
    });
  }

  leaveSchedule(data?: any) {
    return this.formBuilder.group({
      date: [data?.date, Validators.required],
      leaveDayType: [LeaveDayType.Half_day],
      halfDaySchedule: [HalfDaySchedule.Afternoon_Hours],
      usedDays: [0.5, Validators.required]
    });
  }

  document(fileUpload: FileUpload | null) {
    return this.formBuilder.group({
      fileName: [ fileUpload?.name, Validators.required ],
      filePath: [ fileUpload?.url, Validators.required ]
    });
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

  openOnNewTab(link: any) {
    window.open(link, '_blank');
  }

  calculateDaysRequested() {
    let days = 0;

    switch (this.formModel.get('leaveDayDuration').value) {
      case LeaveDayType.All_day:
        days = this.getWorkdays();
        break;
      case LeaveDayType.Half_day:
        days = this.calculateUsedDays();
        break;
    }

    this.formModel.get('usedDays').patchValue(days);
    return Number(this.formModel.get('usedDays').value);
  }

  getWorkdays() {
    const startDate = this.formModel.get('startDate').value;
    const endDate = this.formModel.get('endDate').value;

    if ((startDate === '' || endDate === '') && (startDate === '' && endDate === '')) return 0;
    let workdays = 0;
    let curDate = +startDate;
    while (curDate <= +endDate) {
      const dayNumber = new Date(curDate).getDay();
      const noneWorkDay = (dayNumber === 6) || (dayNumber === 0);
      if (!noneWorkDay) {
        workdays++;
      }
      curDate = curDate + 24 * 60 * 60 * 1000;
    }
    return workdays - this.getHolidaysDuringWeekdays();
  }

  getHolidaysDuringWeekdays() {
    const startDate = this.formModel.get('startDate').value;
    const endDate = this.formModel.get('endDate').value;

    if ((startDate === '' || endDate === '') && (startDate === '' && endDate === '')) return 0;

    let publicHolidays = 0;
    let curDate = +startDate;
    this.leaveWithHolidays = [];

    while (curDate <= +endDate) {
      const day = new Date(curDate);
      const dayNumber = new Date(curDate).getDay();
      const holiday = this.eventService.holidays.value.find(d => new Date(d.startDate).getTime() === day.getTime());
      const isHoliday = holiday ? true : false;

      if (isHoliday && dayNumber !== 6 && dayNumber !== 0) {
        const isHolidayTracked = this.leaveWithHolidays.find(d => new Date(d.startDate).getTime() === new Date(holiday.startDate).getTime());
        if (!isHolidayTracked) this.leaveWithHolidays.push(holiday);
        publicHolidays++;
      }

      curDate = curDate + 24 * 60 * 60 * 1000;
    }
    return publicHolidays;
  }

  calculateDaysRemaining(): number | undefined {
    this.negativeDays = false;
    const leaveType = this.formModel.get('leaveType').value;
    switch (leaveType) {
      case LeaveTypes.Annual:
      case LeaveTypes.Family_Responsibility:
      case LeaveTypes.Sick:
        this.daysAvailable = this.leaveBalances.find(x => x.balanceType === leaveType).remaining;
        break;
      default:
        return 0;
    }

    if (this.daysAvailable) {
      this.daysRemaining = this.daysAvailable - this.calculateDaysRequested();
      if (this.daysRemaining < 0) {
        this.negativeDays = true;
      }
      return this.daysRemaining;
    }
    return undefined;
  }

  applyForLeave() {

    this.formModel.markAllAsTouched();

    if (this.formModel.invalid) {
      return;
    }

    // Fix time offset
    var leaveRequest = this.formModel.value;
    leaveRequest.startDate = this.formatDate(leaveRequest.startDate);
    leaveRequest.endDate = this.formatDate(leaveRequest.endDate);

    this.leaveService.applyForLeave(leaveRequest).subscribe(_ => {
      this.toastr.success(`Your leave was successfully created.`);
      this.modalRef.close(true);
    });
  }

  onOptionsSelected() {
   switch (this.formModel.get('leaveDayDuration').value) {
      case LeaveDayType.Half_day:
        const startDate = new Date(this.formModel.get('startDate').value);
        const newDate = new Date(startDate.setDate(startDate.getDate() - 1));

        let index = 0;
        this.getHolidaysDuringWeekdays();
        while (index < this.getWorkdays()) {
          const endDate = new Date(newDate.setDate(newDate.getDate() + 1));
          const isHoliday = this.eventService.holidays.value.find(d => new Date(d.startDate).getTime() === endDate.getTime()) ? true : false;
          if (endDate.getDay() != 0 && endDate.getDay() != 6 && !isHoliday) {
            this.formModel.get('leaveSchedule').push(this.leaveSchedule({
              date: new Date(endDate)
            }));
            index++;
          }
        }
        break;
      default:
        break;
    }
  }

  formatDate(date: Date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
  }

  isAllowed(leaveType: any) {
    switch (leaveType) {
      case LeaveTypes.Annual:
      case LeaveTypes.Sick:
      case LeaveTypes.Family_Responsibility:
        if (this.leaveBalances.find(x => x.balanceType === leaveType).remaining === 0) {
          return true;
        }
        return false;
      case LeaveTypes.Unpaid:
        return false;
      default:
        return true;
    }
  }

  onLeaveTypeSelected(leaveType: any) {
    if (
      (leaveType === LeaveTypes.Sick && Number(this.formModel.get('usedDays').value) > 1)
      || leaveType === LeaveTypes.Family_Responsibility) {
      this.formModel.get('documents').setValidators(Validators.required);
      this.formModel.get('documents').updateValueAndValidity();
      return true;
    } else {
      this.formModel.get('documents').setValidators(null);
      this.formModel.get('documents').updateValueAndValidity();
      return false;
    }
  }

  isDefault(leaveType: any) {
    switch (leaveType) {
      case LeaveTypes.Please_Select_A_Leave:
        return true;
      default:
        return false;
    }
  }

  handleFileInput(event: Event) {
    // const target = event.target as HTMLInputElement;
    // const files = target.files as FileList;

    // Array.from(files).forEach((file: File) => {
    //   var fileUpload: FileUpload | null = new FileUpload(file);
    //   this.uploadService.uploadToStorage(fileUpload)?.then((response) => {
    //     console.log(fileUpload+" Snow");
    //     this.formModel.get('documents').push(this.document(response));
    //   });
    // });
  }

  getFormControl(form: any, formControlName: string): any {
    return form.controls[formControlName];
  }

  isAllDay() {
    switch (this.formModel.get('leaveDayDuration').value) {
      case LeaveDayType.All_day:
        return true;
      default:
        return false;
    }
  }

  dateRangeChange() {
    this.formModel.get('leaveSchedule').controls = [];
    this.formModel.get('leaveDayDuration').patchValue(LeaveDayType.All_day);
  }

  holidaysAndWeekendsDatesFilter = (value: Date): boolean => {
    var holidays: any[] = [];
    const day = (value || new Date()).getDay();

    var holidaysJson = localStorage.getItem(constants.holidays);

    if (holidaysJson) {
      holidays = JSON.parse(holidaysJson)
    }
    var isHoliday = holidays.find(d => new Date(d.startDate).getTime() === value.getTime());

    return day !== 0 && day !== 6 && !isHoliday;
  }

  updateUsedDays(index: number) {
    const form = this.formModel.get('leaveSchedule').at(index);

    switch (form.get('leaveDayType')?.value) {
      case LeaveDayType.All_day:
        form.get('halfDaySchedule')?.patchValue(HalfDaySchedule.None);
        form.get('usedDays')?.patchValue(1);
        break;
      case LeaveDayType.Half_day:
        form.get('halfDaySchedule')?.patchValue(HalfDaySchedule.Morning_Hours);
        form.get('usedDays')?.patchValue(0.5);
        break;
    }
  }

  calculateUsedDays() {
    const form = this.formModel.get('leaveSchedule').value;
    return form.reduce((a: any, b: any) => a + b.usedDays, 0);
  }

  close() {
    this.modalRef.close();
  }

}
