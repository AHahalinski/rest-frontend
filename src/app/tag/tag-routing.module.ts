import { TagsComponent } from './pages/tag-list/tags.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const tagRoutes: Routes = [
  { path: 'tags', component: TagsComponent }
  // // { path: 'add', component: AddEditComponent },
  // // { path: ':id', component: DetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(tagRoutes)],
  exports: [RouterModule]
})
export class TagRoutingModule { }
