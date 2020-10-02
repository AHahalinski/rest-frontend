import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../shared/guard/admin.guard';

const userRoutes: Routes = [
  {
    path: '',
    component: UserListComponent,
    canActivate: [AdminGuard]
  },
  {
    path: ':id',
    component: UserDetailsComponent,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
