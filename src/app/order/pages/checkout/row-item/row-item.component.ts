import { BehaviorSubject } from 'rxjs';
import { OrderService } from './../../../../services/order.service';
import { Router } from '@angular/router';
import { Certificate } from 'src/app/shared/entity/Certificate';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-row-item',
  templateUrl: './row-item.component.html',
  styleUrls: ['./row-item.component.scss']
})
export class RowItemComponent implements OnInit {

  @Input() public certificate: Certificate;
  @Input() public amount$: BehaviorSubject<Map<number, number>>;
  amount: number;

  constructor(
    private orderService: OrderService,
    private router: Router) { }

  ngOnInit(): void {
    this.amount$.subscribe(data => {
      this.amount = data.get(this.certificate.id);
    });
  }

  public certificateDetails(): void {
    this.router.navigate([`/certificates/${this.certificate.id}`]);
  }

  public add(certificate: Certificate): void {
    this.orderService.add(certificate);
  }

  public remove(certificate: Certificate): void {
    this.orderService.remove(certificate);
  }
}
