import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrMessagesService {
  defaultDuration: number = 5000;
  
  constructor(private toastrService: ToastrService) { }

  showErrorMessage(messageTitle: string, message: string, duration: number = this.defaultDuration): void {
    this.toastrService.error(message, messageTitle, { timeOut: duration });
  }

  showWarningMessage(messageTitle: string, message: string, duration: number = this.defaultDuration): void {
    this.toastrService.warning(message, messageTitle, { timeOut: duration });
  }

  showInfoMessage(messageTitle: string, message: string, duration: number = this.defaultDuration): void {
    this.toastrService.info(message, messageTitle, { timeOut: duration });
  }

  showSuccessMessage(messageTitle: string, message: string, duration: number = this.defaultDuration): void {
    this.toastrService.success(message, messageTitle, { timeOut: duration });
  }
}
