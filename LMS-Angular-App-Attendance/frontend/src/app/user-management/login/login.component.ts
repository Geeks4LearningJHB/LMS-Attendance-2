import { AbstractControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { constants } from 'src/app/shared/global/global.constants';
import { Router } from '@angular/router';
import { setSessionStoragePairs } from 'src/app/shared/global/utils';
import { DataService } from 'src/app/mockData/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  serverErrorMessage: any;
  result: any;
  userId: any = '156b5e89-99ad-47aa-2895-08da80ffdfed';
  captureGoalsTime: any;
  loginForm!: UntypedFormGroup;
  holdingArray: UntypedFormGroup = new UntypedFormGroup({});

  constructor(private userService: UserService, private router: Router, private dataService : DataService) { }
   








  getFormControl(control: String): AbstractControl {
    return this.loginForm.controls[`${control}`];
  }

  clearFormControlErrors(): void {
    this.getFormControl('Email').setErrors(null);
    this.getFormControl('Password').setErrors(null);
  }

  ngOnInit(): void {
    this.loginForm = new UntypedFormGroup({
      Email: new UntypedFormControl(null, [Validators.required, Validators.email]),
      Password: new UntypedFormControl(null, Validators.required),
    }
  
    );

    // Clearing errors when making username changes
    this.getFormControl('Email').valueChanges.subscribe(() => {
      this.clearFormControlErrors();
    })

    // Clearing errors when making password changes
    this.getFormControl('Password').valueChanges.subscribe(() => {
      this.clearFormControlErrors();
    })
  }

  get currentDateTime(): string {
    let tzoffset = Math.abs(new Date().getTimezoneOffset() * 60000);
    return (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
  }

  get isFormInvalid(): boolean { return this.loginForm.invalid; }

  isValid(key: string): boolean { return !this.getFormControl(key).invalid }

  isTouched(key: string): boolean { return this.getFormControl(key).touched; }

  login(): void {
    // display the error message
    this.loginForm.markAllAsTouched();

    // stop the code running
    if (this.isFormInvalid) return;

    const formData = this.loginForm.value;

// Now you can access individual form control values like this
   const email = formData.Email;
   const password = formData.Password;
   this.captureGoalsTime = new Date(Date.now()).getMinutes() + 1;
   this.dataService.setLoggedIn(email);
   const loggedInUser = this.dataService.getUserByUsername(email);
   console.log(this.dataService.getUsers())

    // making a backend call
    try {
        setSessionStoragePairs(
          [
            constants.token,
            constants.username,
            constants.role,
            constants.time,
            "date",
            "times"
            
          ],
          [
            loggedInUser?.token,
            `${loggedInUser?.name} ${loggedInUser?.surname}`,
            loggedInUser?.role,
            this.currentDateTime,
            this.currentDateTime,
            this.captureGoalsTime
          ]
        )
     
       
        console.log("I am sessionStorage : " + sessionStorage)
        this.router.navigate(['/leave']);
      }catch(error){

        console.log(error);
      }
  }
  
}
