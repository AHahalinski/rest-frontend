import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

const userRoutes: Routes = [
  // { path: 'users', component: LoginComponent },
  // { path: 'add', component: AddEditComponent },
  // { path: ':id', component: DetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
