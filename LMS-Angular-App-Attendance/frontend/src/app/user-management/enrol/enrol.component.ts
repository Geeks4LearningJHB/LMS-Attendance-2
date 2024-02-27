import { formatDate } from '@angular/common';
import { Component, OnInit, DoCheck } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { constants } from 'src/app/shared/global/global.constants';
import { Roles } from 'src/app/shared/global/roles';
import { ServerErrorCodes } from 'src/app/shared/global/server-error-codes';
import { Streams } from 'src/app/shared/global/streams';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { environment } from 'src/environments/environment';
import { SponsorService } from '../services/sponsor.service';
import { UserService } from '../services/user.service';
import { ClockInTime } from 'src/app/shared/global/clock-in-times';

@Component({
  selector: 'app-enrol',
  templateUrl: './enrol.component.html',
  styleUrls: ['./enrol.component.css'],
})
export class EnrolComponent implements OnInit, DoCheck {
  formModel: any;
  // formModel: FormGroup = new FormGroup({});

  keys = Object.keys;

  roles = Roles;
  streams = Streams;
  user: any | null = null;
  userRole: string | null = null;
  serverErrorMessage: any;
  editCrucialInfo: boolean = false;
  sponsors: any[] = [];
  clockInTime = ClockInTime;

  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings: any = {};

  constructor(
    private formBuilder: UntypedFormBuilder,
    private userService: UserService,
    public modalRef: MdbModalRef<EnrolComponent>,
    private toastr: ToastrService,
    private sponsorService: SponsorService
  ) {}

  ngDoCheck(): void {
    console.log(this.formModel);
  }

  ngOnInit(): void {
    this.getSponsors();
    this.buildForm(this.user);
    this.userRole = sessionStorage.getItem(constants.role);
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  buildForm(user?: any) {
    this.formModel = this.formBuilder.group({
      Id: [user?.id],
      Name: [user?.name, [Validators.required, CustomValidators.names]],
      Surname: [user?.surname, [Validators.required, CustomValidators.names]],
      IdNumber: [
        { value: user?.idNumber, disabled: user?.idNumber },
        [Validators.required, CustomValidators.IdNumber],
      ],
      Phone: [user?.phone, [Validators.required, CustomValidators.phone]],
      Email: [user?.email, [Validators.required, CustomValidators.email]],
      Role: [
        {
          value: user?.role || Roles.Please_select_a_role,
          disabled: !this.editCrucialInfo,
        },
        Validators.required,
      ],
      Career: [
        {
          value: user?.career || Streams.Please_select_a_stream,
          disabled: !this.editCrucialInfo,
        },
      ],
      SponsorId: [
        {
          value: user?.sponsorId || null,
          disabled: !this.editCrucialInfo,
        },
      ],
      Clients: [
        {
          value: null,
          disabled: !this.editCrucialInfo,
        },
      ],
      LearnershipStartDate: [
        {
          value: user?.learnershipStartDate
            ? formatDate(
                new Date(user?.learnershipStartDate),
                'yyyy-MM-dd',
                'en'
              )
            : formatDate(new Date(), 'yyyy-MM-dd', 'en'),
          disabled: !this.editCrucialInfo,
        },
      ],
      Password: [environment.defaultPassword, Validators.required],
      ClockInTime: [
        {
          value: user?.clockInTime || ClockInTime.Please_select_a_clock_in_time,
          disabled: !this.editCrucialInfo,
        },
      ],
    });
  }

  getSponsorByUserId(userId: any): any {
    if (userId) {
      this.sponsorService
        .getSponsorByUserId(userId)
        .subscribe((response: any) => {
          return response;
        });
    }
  }

  getSponsors() {
    this.sponsorService.getSponsors().subscribe((response: any) => {
      this.sponsors = response;
    });
  }

  handleInput($event: any) {
    console.log($event);
    console.log(this.formModel.controls['Clients']);
  }

  addUser() {
    this.formModel.markAllAsTouched();

    if (this.formModel.invalid) {
      return;
    }

    this.removeDropDownDefaults();
    this.userService.addUser(this.formModel.value).subscribe(
      () => {
        this.toastr.success(
          `${this.formModel.value?.Name} ${this.formModel.value?.Surname} was successfully added.`
        );
        this.modalRef.close(true);
      },
      (error) => {
        this.serverErrorHandling(error);
      }
    );
  }

  updateUser() {
    this.formModel.markAllAsTouched();

    if (this.formModel.invalid) {
      return;
    }

    this.removeDropDownDefaults();

    this.userService.updateUser(this.formModel.value).subscribe(
      () => {
        this.toastr.success(
          `${this.formModel.value?.Name} ${this.formModel.value?.Surname} was successfully updated.`
        );
        this.modalRef.close(true);
      },
      (error) => {
        this.serverErrorHandling(error);
      }
    );
  }

  serverErrorHandling(error: any) {
    switch (error?.errorCode) {
      case ServerErrorCodes.DuplicateEmail:
        this.formModel.controls['Email'].setErrors({
          duplicateEmailError: true,
        });
        this.serverErrorMessage = error?.message;
        break;
      case ServerErrorCodes.DuplicatePhoneNumber:
        this.formModel.controls['Phone'].setErrors({
          duplicatePhoneNumberError: true,
        });
        this.serverErrorMessage = error?.message;
        break;
      case ServerErrorCodes.DuplicateIdNumber:
        this.formModel.controls['IdNumber'].setErrors({
          duplicateIdNumberError: true,
        });
        this.serverErrorMessage = error?.message;
        break;
    }
    this.formModel.updateValueAndValidity();
  }

  removeDropDownDefaults() {
    if (
      this.formModel.controls['Career'].value === Streams.Please_select_a_stream
    ) {
      this.formModel.controls['Career'].patchValue('None');
    }
  }

  close() {
    this.modalRef.close();
  }

  isAllowed(role: any) {
    if (this.userRole == Roles.Super_Admin) {
      switch (role) {
        case Roles.Super_Admin:
          return true;
        default:
          return false;
      }
    } else if (this.userRole == Roles.Admin) {
      switch (role) {
        case Roles.Super_Admin:
        case Roles.Admin:
          return true;
        default:
          return false;
      }
    } else {
      return true;
    }
  }

  isLearner() {
    const role = this.formModel.controls['Role'].value;
    switch (role) {
      case Roles.Learner:
        return true;
      case Roles.Trainer:
        // this.setG4LDefaults();
        return false;
      case Roles.Admin:
      case Roles.Super_Admin:
        this.setG4LDefaults();
        return false;
      default:
        return false;
    }
  }

  isTrainer() {
    const role = this.formModel.controls['Role'].value;
    switch (role) {
      case Roles.Trainer:
        return true;
      case Roles.Learner:
      case Roles.Admin:
      case Roles.Super_Admin:
      default:
        return false;
    }
  }


  setG4LDefaults() {
    const today = Date.now();

    this.formModel.controls['Career'].patchValue(
      Streams.Please_select_a_stream
    );
    this.formModel.controls['Sponsor'].patchValue('');
    this.formModel.controls['LearnershipStartDate'].patchValue(
      formatDate(new Date(new Date(today).toISOString()), 'yyyy-MM-dd', 'en')
    );
  }

  isDefault(stream: any) {
    switch (stream) {
      case Streams.Please_select_a_stream:
      case Roles.Please_select_a_role:
        return true;
      default:
        return false;
    }
  }
}
