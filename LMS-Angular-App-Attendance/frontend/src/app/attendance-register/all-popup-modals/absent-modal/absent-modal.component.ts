import { Component,  Inject,  OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-absent-modal',
  templateUrl: './absent-modal.component.html',
  styleUrls: ['./absent-modal.component.css']
})
export class AbsentModalComponent implements OnInit {


 constructor(public dialogRef: MatDialogRef<AbsentModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}
              
   absentStudents: { name: string, phoneNumber: string, sponsor: string, date: Date , reason: string}[] = [
    { name: 'Neo Moloi', phoneNumber: '123-456-7890', sponsor: 'FNB', date: new Date('2022-04-05'), reason: "Annual leave" },
    { name: 'Themba Zwane', phoneNumber: '123-456-7890', sponsor: 'ABSA', date: new Date('2022-04-05'),  reason: "Did not report" },
    { name: 'Thembinkosi Lorch', phoneNumber: '123-456-7890', sponsor: 'FNB', date: new Date('2022-04-05'),  reason: "On leave" },
    { name: 'Rowen Willams', phoneNumber: '123-456-7890', sponsor: 'Riverside', date: new Date('2022-04-05') ,  reason: "Sick leave"},
    { name: 'Grant Kekana', phoneNumber: '123-456-7890', sponsor: 'AWS', date: new Date('2022-04-05') ,  reason: "On leave"},
  ];
 

  closeModal() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    
  }


  

}
