import { InfoWindowComponent } from './../../../shared/components/info-window/info-window.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../entity/user';
import { UserService } from 'src/app/services/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public registrationForm: FormGroup;
  public submitted = false;
  public isAuth = false;

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private router: Router,
    private builder: FormBuilder
  ) { }

  ngOnInit(): void {
    // this.registrationForm = new FormGroup(
    //   {
    //     login: new FormControl(null, [Validators.required]),
    //     password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    //     repeatedPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    //     firstName: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z]+$')]),
    //     secondName: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z]+$')])
    //   }
    // );
    this.registrationForm = this.builder.group(
      {
        login: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
        repeatedPassword: new FormControl(null, []),
        firstName: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z]+$')]),
        secondName: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z]+$')])
      }
      , { validators: matchingPasswords('password', 'repeatedPassword') }
    );
  }

  public register(): void {
    if (this.registrationForm.invalid) {
      return;
    }
    this.submitted = true;
    const user = new User(
      null,
      this.registrationForm.value.login,
      this.registrationForm.value.password,
      this.registrationForm.value.firstName,
      this.registrationForm.value.secondName);
    this.userService.register(user).subscribe(response => {
      this.registrationForm.reset();
      if (response.status === 201) {
        console.log('You was regestered');
        this.showInfoResultOperation(null);
      }
      this.submitted = false;
    }, () => { this.submitted = false; });
  }

  private showInfoResultOperation(id: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Register new user',
      text: `Your registration was successful`,
      btnReturnAll: `Login`
    };
    const dialogRef = this.dialog.open(InfoWindowComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/auth/login']);
    });
  }
}



export function matchingPasswords(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
  return (group: FormGroup): { [key: string]: any } => {
    const password = group.controls[passwordKey];
    console.log(password);
    const confirmPassword = group.controls[confirmPasswordKey];
    console.log(confirmPassword);
    if (password.value !== confirmPassword.value) {
      return {
        mismatchedPasswords: true
      };
    }
  };
}
