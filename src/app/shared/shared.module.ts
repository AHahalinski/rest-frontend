import { NavTopLineComponent } from './components/nav-top-line/nav-top-line.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContentComponent } from './components/content/content.component';

@NgModule({
  declarations: [
    NavTopLineComponent,
    FooterComponent,
    HeaderComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavTopLineComponent,
    FooterComponent,
    HeaderComponent,
    ContentComponent
  ]
})
export class SharedModule { }
