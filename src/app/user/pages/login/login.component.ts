import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthenticationRequest } from 'src/app/services/entity/AuthenticationRequest';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  // tslint:disable-next-line: no-inferrable-types
  public submitted: boolean = false;

  constructor(private userService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        login: new FormControl(null),
        password: new FormControl(null)
      }
    );
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.submitted = true;
    const user = new AuthenticationRequest(this.loginForm.value.login, this.loginForm.value.password);
    console.log(`login: ${user.login}, password: ${user.password}`);
    this.userService.login(user).subscribe(response => {
      this.loginForm.reset();
      this.router.navigate(['/certificates']);
      this.submitted = false;
    }, () => { this.submitted = false; });
  }
}
