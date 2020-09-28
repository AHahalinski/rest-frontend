import { OrderListComponent } from './pages/order-list/order-list.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { CheckoutComponent } from './pages/checkout/chekout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const orderRoutes: Routes = [
  { path: '', component: OrderListComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: ':id', component: OrderDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(orderRoutes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
