import { AuthGuard } from './shared/guard/auth.guard';
import { RegistrationComponent } from './user/pages/registration/registration.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user/pages/login/login.component';
import { ErrorPageComponent } from './shared/page/error-page/error-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'certificates',
    pathMatch: 'full'
  },
  {
    path: 'certificates',
    loadChildren: () => import('./certificate/certificate.module').then(m => m.CertificateModule)
  },
  {
    path: 'tags',
    loadChildren: () => import('./tag/tag.module').then(m => m.TagModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'orders',
    loadChildren: () => import('./order/order.module').then(m => m.OrderModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'auth/login', component: LoginComponent
  },
  {
    path: 'auth/registration', component: RegistrationComponent
  },
  {
    path: '**', component: ErrorPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
