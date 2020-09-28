import { InfoWindowComponent } from './../../../shared/components/info-window/info-window.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup(
      {
        login: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
        repeatedPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
        firstName: new FormControl(null, [Validators.required, Validators.minLength(2)]),
        secondName: new FormControl(null, [Validators.required, Validators.minLength(2)])
      }
    );
  }

  public register(): void {
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
