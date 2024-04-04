import { Component,  Inject,  OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-absent-modal',
  templateUrl: './absent-modal.component.html',
  styleUrls: ['./absent-modal.component.css']
})
export class AbsentModalComponent implements OnInit {
absentGeeks : any
currentDate!: Date;

 constructor(public dialogRef: MatDialogRef<AbsentModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}
 

  closeModal() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.currentDate = new Date();
    if (this.data && this.data.length > 0) {
      this.absentGeeks = this.data
      console.log(this.absentGeeks)
    }
  }


  

}
