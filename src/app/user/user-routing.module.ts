import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const userRoutes: Routes = [
  // { path: '', component: CertificatesComponent },
  // { path: 'add', component: AddEditComponent },
  // { path: ':id', component: DetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
