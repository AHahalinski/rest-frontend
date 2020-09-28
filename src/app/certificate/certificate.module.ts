import { EditComponent } from './pages/edit/edit.component';
import { DetailsComponent } from './pages/details/details.component';
import { MaterialModule } from './../material.module';
import { CertificateRoutingModule } from './certifacate-routing.module';
import { SharedModule } from './../shared/shared.module';
import { CertificatesComponent } from './pages/main/certificates/certificates.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './pages/main/certificates/card/card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChipListComponent } from './material/chip-list/chip-list.component';
import { CreateComponent } from './pages/create/create.component';


@NgModule({
  declarations: [
    CardComponent,
    CertificatesComponent,
    ChipListComponent,
    CreateComponent,
    DetailsComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CertificateRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class CertificateModule { }
