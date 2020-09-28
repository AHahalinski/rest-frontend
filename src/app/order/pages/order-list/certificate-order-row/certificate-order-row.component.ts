import { Order } from './../../../../shared/entity/Order';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-certificate-order-row',
  templateUrl: './certificate-order-row.component.html',
  styleUrls: ['./certificate-order-row.component.scss']
})
export class CertificateOrderRowComponent implements OnInit {

  @Input() public order: Order;

  constructor() { }

  ngOnInit(): void {
  }
}
