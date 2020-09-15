import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const orderRoutes: Routes = [
  // { path: '', component: CertificatesComponent },
  // { path: 'add', component: AddEditComponent },
  // { path: ':id', component: DetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(orderRoutes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
