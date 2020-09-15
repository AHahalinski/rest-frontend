import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const tagRoutes: Routes = [
  // { path: '', component: CertificatesComponent },
  // { path: 'add', component: AddEditComponent },
  // { path: ':id', component: DetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(tagRoutes)],
  exports: [RouterModule]
})
export class TagRoutingModule { }
