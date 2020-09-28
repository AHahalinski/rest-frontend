import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Certificate } from 'src/app/shared/entity/Certificate';
import { OrderService } from './../../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { InfoWindowComponent } from 'src/app/shared/components/info-window/info-window.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  public certificates: Certificate[] = [];
  public setCertificates$;
  public totalPrice: number;

  constructor(
    public dialog: MatDialog,
    public orderService: OrderService,
    private router: Router) { }

  ngOnInit(): void {
    this.orderService.getCertificates().subscribe(data => this.certificates = data);
    this.setCertificates$ = this.orderService.setSertificates$.pipe(map((data) => {
      data.sort((a, b) => {
        return a.name < b.name ? -1 : 1;
      });
      return data;
    }));
    this.orderService.totalPrice$.subscribe(data => this.totalPrice = data);
  }

  public saveOrder(): void {
    this.orderService.save().subscribe(data => {
      if (data.status === 201) {
        console.log(`order #${data.body.id} was created`);
        this.showInfoResultOperation(data.body.id);
      }
    });
  }

  public cleanCart(): void {
    this.orderService.cleanCart();
    window.location.reload();
  }

  private showInfoResultOperation(id: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Checkout',
      text: `The order # ${id} was created.`,
      btnReturnAll: `Go to all`,
      btnReturnDetails: `Go to details`
    };
    const dialogRef = this.dialog.open(InfoWindowComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate([`orders`]);
      } else {
        this.router.navigate([`orders/${id}`]);
      }
      this.orderService.cleanCart();
    });
  }
}
