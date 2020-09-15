import { SharedModule } from './../shared/shared.module';
import { TagRoutingModule } from './tag-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsComponent } from './pages/tag-list/tags.component';
import { TagCardComponent } from './pages/tag-card/tag-card.component';



@NgModule({
  declarations: [
    TagsComponent,
    TagCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TagRoutingModule
  ]
})
export class TagModule { }
