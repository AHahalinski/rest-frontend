import { CertificateRoutingModule } from './certifacate-routing.module';
import { SharedModule } from './../shared/shared.module';
import { CertificatesComponent } from './pages/main/certificates/certificates.component';
import { CardComponent } from './pages/main/card/card.component';
import { AddEditComponent } from './pages/add-edit/add-edit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './pages/details/details.component';

@NgModule({
  declarations: [
    DetailsComponent,
    AddEditComponent,
    CardComponent,
    CertificatesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CertificateRoutingModule
  ]
})
export class CertificateModule { }
