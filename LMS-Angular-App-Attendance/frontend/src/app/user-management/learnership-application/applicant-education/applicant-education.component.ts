import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-applicant-education',
  templateUrl: './applicant-education.component.html',
  styleUrls: ['./applicant-education.component.css']
})
export class ApplicantEducationComponent implements OnInit {

   personalInformationForm!: UntypedFormGroup;
  constructor(private route: Router, private formBuilder: UntypedFormBuilder) { }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  

  routeToPersonalInformation() {
    this.route.navigate(["learnership-application", "personal-information"])

  }

}


// getFormControl(control: String): AbstractControl {
  //   return this.personalInformationForm.controls[`${control}`];
  // }

  // ngOnInit() {
    // Initialize the form with the form controls and their validations
  //   this.personalInformationForm = new FormGroup({
  //     Firstname: new FormControl(null, [Validators.required, Validators.required]),
  //     Surname: new FormControl(null, Validators.required),
      
  //   });
  // }