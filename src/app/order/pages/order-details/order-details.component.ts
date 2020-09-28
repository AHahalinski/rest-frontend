import { Certificate } from './../../../shared/entity/Certificate';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from './../../../services/order.service';
import { Order } from './../../../shared/entity/Order';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  public order: Observable<Order>;
  private orderId: number;
  public setCertificates: Certificate[];
  public mapIdAmount: Map<number, number>;
  public certificates: Certificate[];

  constructor(
    private orderService: OrderService,
    private activeRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRouter.params.subscribe(paramsId => {
      this.orderId = paramsId.id;
    });
    this.order = this.orderService.getOrderById(this.orderId);
    this.order.subscribe(
      (data: Order) => {
        this.setCertificates = this.getSetCertificates(data.certificates);
        this.mapIdAmount = this.getMapCertificates(data.certificates);
      });
  }

  public getMapCertificates(certificates: Certificate[]): Map<number, number> {
    return this.orderService.getMapCertificates(certificates);
  }

  public getSetCertificates(certificates: Certificate[]): Certificate[] {
    return this.orderService.getSetCertificates(certificates);
  }

  public getAmount(certificate: Certificate): number {
    return this.getMapCertificates(this.certificates).get(certificate.id);
  }
}
