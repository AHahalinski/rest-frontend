import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CertificatesComponent } from './pages/main/certificates/certificates.component';
import { AddEditComponent } from './pages/add-edit/add-edit.component';
import { DetailsComponent } from './pages/details/details.component';

const certificateRoutes: Routes = [
  { path: '', redirectTo: 'certificates', pathMatch: 'full' },
  { path: 'certificates', component: CertificatesComponent },
  { path: 'certificates/add', component: AddEditComponent },
  { path: 'certificates/:id/edit', component: AddEditComponent },
  { path: 'certificates/:id', component: DetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(certificateRoutes)],
  exports: [RouterModule]
})

export class CertificateRoutingModule { }
