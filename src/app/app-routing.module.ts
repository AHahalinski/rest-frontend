import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TagModule } from './tag/tag.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { CertificateModule } from './certificate/certificate.module';
import { LoginComponent } from './user/pages/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'certificates', pathMatch: 'full' },
  { path: 'certificates', loadChildren: () => CertificateModule },
  { path: 'tags', loadChildren: () => TagModule },
  { path: 'orders', loadChildren: () => OrderModule },
  { path: 'users', loadChildren: () => UserModule },
  { path: 'auth/login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    CertificateModule,
    TagModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
