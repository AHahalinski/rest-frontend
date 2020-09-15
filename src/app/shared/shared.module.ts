import { NavTopLineComponent } from './components/nav-top-line/nav-top-line.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    NavTopLineComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavTopLineComponent,
    FooterComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
