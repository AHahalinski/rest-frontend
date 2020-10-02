import { AdminGuard } from './../shared/guard/admin.guard';
import { EditComponent } from './pages/edit/edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CertificatesComponent } from './pages/main/certificates/certificates.component';
import { DetailsComponent } from './pages/details/details.component';
import { CreateComponent } from './pages/create/create.component';

const certificateRoutes: Routes = [
  {
    path: '',
    component: CertificatesComponent
  },
  {
    path: 'add',
    component: CreateComponent,
    canActivate: [AdminGuard]
  },
  {
    path: ':id',
    component: DetailsComponent
  },
  {
    path: ':id/edit',
    component: EditComponent,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(certificateRoutes)],
  exports: [RouterModule]
})

export class CertificateRoutingModule { }
