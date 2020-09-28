import { MaterialModule } from './../material.module';
import { SharedModule } from './../shared/shared.module';
import { TagRoutingModule } from './tag-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsComponent } from './pages/tag-list/tags.component';
import { DetailsComponent } from './pages/details/details.component';
import { TagCardComponent } from './pages/tag-list/tag-card/tag-card.component';
import { CreateComponent } from './pages/create/create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EditTagComponent } from './pages/edit-tag/edit-tag.component';



@NgModule({
  declarations: [
    TagsComponent,
    TagCardComponent,
    DetailsComponent,
    CreateComponent,
    EditTagComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TagRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class TagModule { }
