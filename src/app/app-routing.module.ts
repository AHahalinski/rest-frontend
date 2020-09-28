import { RegistrationComponent } from './user/pages/registration/registration.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user/pages/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'certificates', pathMatch: 'full' },
  { path: 'certificates', loadChildren: () => import('./certificate/certificate.module').then(m => m.CertificateModule) },
  { path: 'tags', loadChildren: () => import('./tag/tag.module').then(m => m.TagModule)},
  { path: 'orders', loadChildren: () => import('./order/order.module').then(m => m.OrderModule) },
  { path: 'users', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/registration', component: RegistrationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
