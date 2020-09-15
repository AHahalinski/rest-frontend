import { CertificateModule } from './certificate/certificate.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TagModule } from './tag/tag.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', loadChildren: () => CertificateModule },
  { path: 'certificates', loadChildren: () => CertificateModule },
  { path: 'tags', loadChildren: () => TagModule },
  { path: 'orders', loadChildren: () => OrderModule },
  { path: 'users', loadChildren: () => UserModule }

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    CertificateModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
