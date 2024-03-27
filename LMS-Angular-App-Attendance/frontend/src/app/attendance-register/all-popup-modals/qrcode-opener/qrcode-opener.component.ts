import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AttendanceService } from '../../services/attendance.service';
import { AttendanceModel } from '../../models/attendance.interface';
import {DomSanitizer , SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-qrcode-opener',
  templateUrl: './qrcode-opener.component.html',
  styleUrls: ['./qrcode-opener.component.css']
})
export class QRCodeOpenerComponent {
  allowModalClosure!: boolean;
  formModel: any;
  qrCodeImage: any;
  displayQRCode!: boolean ;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {attendanceId : String} ,
     private attendanceService: AttendanceService,
     public dialogRef: MatDialogRef<QRCodeOpenerComponent>
    ){}
   
    ngOnInit(){
      this.openQRCodeModal(this.data.attendanceId);
      console.log(" QR " + this.displayQRCode)
 
    }

    openQRCodeModal(attendanceId: String) {
      this.attendanceService.getQrCode(attendanceId).subscribe(
        (response: Blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(response);
          console.log("reader ! " + reader)
          reader.onloadend = () => {
            this.qrCodeImage = reader.result;
          };
         
        },
        error => {
          console.error('Error fetching QR code:', error);
         
        }
      );
    }


    showQRCode() {
      this.displayQRCode = true;
      console.log(this.displayQRCode)
    }

    close() {
      this.close();
    }
    
    




}
