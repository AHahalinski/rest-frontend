import { SharedModule } from './../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './pages/registration/registration.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserCardComponent } from './pages/user-list/user-card/user-card.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    UserListComponent,
    UserCardComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
