import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { constants } from '../shared/global/global.constants';
import { Roles } from '../shared/global/roles';
import { EnrolComponent } from './enrol/enrol.component';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  users: any;
  userRole: any;
  modalDialog: MdbModalRef<EnrolComponent> | null = null;

  constructor(
    private userService: UserService,
    private modalService: MdbModalService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
    // this.getPagedUsers(0, 10);
    this.userRole = sessionStorage.getItem(constants.role);
  }

  getPagedUsers(skip: number, take: number) {
    this.userService.getPagedUsers(skip, take).subscribe((response: any) => {
      this.filterUserByRole(response);
    });
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((response: any) => {
      this.filterUserByRole(response);
    });
  }

  filterUserByRole(response: any) {
    switch (this.userRole) {
      case Roles.Super_Admin:
        this.users = response.filter((x: any) => x.role !== Roles.Super_Admin);
        break;
      case Roles.Admin:
        this.users = response.filter(
          (x: any) => x.role !== Roles.Super_Admin && x.role !== Roles.Admin
        );
        break;
      default:
        this.users = response;
        break;
    }
  }

  openDialog(user?: any) {
    this.modalDialog = this.modalService.open(EnrolComponent, {
      animation: true,
      backdrop: true,
      containerClass: 'modal top fade modal-backdrop',
      data: { user: user, editCrucialInfo: true },
      ignoreBackdropClick: false,
      keyboard: true,
      modalClass: 'modal-xl modal-dialog-centered',
    });

    this.modalDialog.onClose.subscribe((isUpdated: boolean) => {
      if (isUpdated) this.getAllUsers();
    });
  }

  deleteUser(id: any) {
    this.userService.deleteUser(id).subscribe((response: any) => {
      this.toastr.success(`The user was successfully deleted`);
      this.getAllUsers();
    });
  }
}
