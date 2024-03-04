import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {

  personalDetails!: UntypedFormGroup;
  constructor(private route: Router, private formBuilder: UntypedFormBuilder) { }

  getFormControl(control: String): AbstractControl {
    return this.personalDetails.controls[`${control}`];
  }

  ngOnInit(): void {
    this.personalDetails = new UntypedFormGroup({
      Firstname: new UntypedFormControl(null, [Validators.required, Validators.required]),
      Surname: new UntypedFormControl(null, Validators.required),
      ID: new UntypedFormControl(null, [Validators.required, Validators.required]),
      Email: new UntypedFormControl(null, Validators.email),
      Gender: new UntypedFormControl(null, [Validators.required, Validators.required]),
      Race: new UntypedFormControl(null, Validators.required),
      Disability: new UntypedFormControl(null, [Validators.required, Validators.required]),
    });
  }

  routeToEducation() {
    this.route.navigate(["learnership-application", "education"])

  }

   // routeToProfile() {
  //   this.route.navigate(["learnership-application", "Profile"])

}
