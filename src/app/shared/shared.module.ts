import { AdminGuard } from './guard/admin.guard';
import { AuthGuard } from './guard/auth.guard';
import { JoinPipe } from './pipe/join-pipe';
import { MaterialModule } from './../material.module';
import { NavTopLineComponent } from './components/nav-top-line/nav-top-line.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { DialogWindowComponent } from './components/dialog-window/dialog-window.component';
import { InfoWindowComponent } from './components/info-window/info-window.component';
import { SpinnerLoadingComponent } from './components/spinner-loading/spinner-loading.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { ErrorPageComponent } from './page/error-page/error-page.component';

@NgModule({
  declarations: [
    NavTopLineComponent,
    FooterComponent,
    HeaderComponent,
    ContentComponent,
    ScrollTopComponent,
    DialogWindowComponent,
    InfoWindowComponent,
    SpinnerLoadingComponent,
    ErrorMessageComponent,
    JoinPipe,
    ErrorPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    NgxMatSelectSearchModule
  ],
  exports: [
    NavTopLineComponent,
    FooterComponent,
    HeaderComponent,
    ContentComponent,
    ScrollTopComponent,
    SpinnerLoadingComponent,
    JoinPipe,
    ErrorPageComponent
  ]
})
export class SharedModule { }
