import { Component, Inject, Output , EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttendanceModel } from '../../models/attendance.interface';
import { AttendanceService } from '../../services/attendance.service';

@Component({
  selector: 'app-adminpopup',
  templateUrl: './adminpopup.component.html',
  styleUrls: ['./adminpopup.component.css']
})

export class AdminpopupComponent {

  unexpectedLogOut!:boolean;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  attendences: any[] = [];
  name!:String
  constructor(@Inject(MAT_DIALOG_DATA) public data: AttendanceModel[] , private attendanceService:AttendanceService) {}
  
  ngOnInit() {
    if (this.data.length > 0) {
      const attendanceId = this.data[0].id;
      this.name=this.data[0].name
      this.attendences = this.data;
      this.checkUexpectedLogOut(attendanceId);
    }
  }
  checkUexpectedLogOut(attendanceId: string) {
    this.attendanceService
      .unexpectedLogOutTime(attendanceId)
      .subscribe(response => {
        this.unexpectedLogOut = response;
      });
  }
 
  @Output() doneClicked = new EventEmitter<void>();

  onDoneClick() {
    this.doneClicked.emit();
  }


  getStatus(status: string): any {
    return status.toLowerCase();
  }

  nextPage() {
    const pageCount = Math.ceil(this.attendences.length / this.itemsPerPage);
    if (this.currentPage < pageCount) {
      this.currentPage++;
    }
  }
  

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  getIndexRange(): { start: number, end: number } {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.attendences.length);
    return { start: startIndex, end: endIndex };
  }

  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.attendences.length / this.itemsPerPage);

    return Array(pageCount).fill(0).map((x, i) => i + 1);
  }
  isNextButtonDisabled(): boolean {
    const pageCount = Math.ceil(this.attendences.length / this.itemsPerPage);
    return this.currentPage >= pageCount;
  }
  


}
