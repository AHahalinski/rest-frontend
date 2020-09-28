import { OrderService } from './../../../services/order.service';
import { Order } from './../../../shared/entity/Order';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  public orders: Observable<Order[]>;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orders = this.orderService.getAllUserOrders()
    .pipe(map (data => data.listDto.content));
  }

}
