import { AdminGuard } from './../shared/guard/admin.guard';
import { EditTagComponent } from './pages/edit-tag/edit-tag.component';
import { CreateComponent } from './pages/create/create.component';
import { DetailsComponent } from './pages/details/details.component';
import { TagsComponent } from './pages/tag-list/tags.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const tagRoutes: Routes = [
  {
    path: '',
    component: TagsComponent
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
    component: EditTagComponent,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(tagRoutes)],
  exports: [RouterModule]
})
export class TagRoutingModule { }
