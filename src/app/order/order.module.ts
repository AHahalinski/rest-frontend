import { SharedModule } from './../shared/shared.module';
import { MaterialModule } from './../material.module';
import { CheckoutComponent } from './pages/checkout/chekout.component';
import { OrderRoutingModule } from './order-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RowItemComponent } from './pages/checkout/row-item/row-item.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { CertificateRowComponent } from './pages/order-details/certificate-row/certificate-row.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { CertificateOrderRowComponent } from './pages/order-list/certificate-order-row/certificate-order-row.component';


@NgModule({
  declarations: [
  CheckoutComponent,
  RowItemComponent,
  OrderDetailsComponent,
  CertificateRowComponent,
  OrderListComponent,
  CertificateOrderRowComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class OrderModule { }
