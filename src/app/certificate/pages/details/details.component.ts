import { InfoWindowComponent } from './../../../shared/components/info-window/info-window.component';
import { DialogWindowComponent } from './../../../shared/components/dialog-window/dialog-window.component';
import { OrderService } from './../../../services/order.service';
import { AuthService } from 'src/app/services/auth.service';
import { CertificateService } from 'src/app/services/certificate.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Certificate } from 'src/app/shared/entity/Certificate';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  public certificate: Certificate;
  private id: number;
  private cSub: Subscription;

  constructor(
    public dialog: MatDialog,
    public authService: AuthService,
    private certificateService: CertificateService,
    private router: ActivatedRoute,
    private routerNav: Router,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.router.params.subscribe(paramsId => {
      this.id = paramsId.id;
    });
    this.cSub = this.certificateService.getCertificateById(this.id)
      .subscribe(data => this.certificate = data);
  }

  ngOnDestroy(): void {
    if (this.cSub) {
      this.cSub.unsubscribe();
    }
  }

  public addToOrder(certificate: Certificate): void {
    this.orderService.add(certificate);
  }

  public getNamesTag(): string[] {
    const tagsName: string[] = [];
    this.certificate?.tags
      .forEach(t => {
        console.log(`tag: ${t.name}`);
        tagsName.push(t.name);
      });
    return tagsName;
  }

  private delete(): void {
    this.certificateService.delete(this.id).subscribe(response => {
      if (response.status === 204) {
        this.showInfoResultOperation(this.id);
      }
    });
  }

  public openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Delete certificate',
      text: `Do you want to delete this certificate?`,
      btnTrue: `Delete`,
      btnFalse: `Cancel`
    };
    const dialogRef = this.dialog.open(DialogWindowComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete();
      }
    });
  }

  private showInfoResultOperation(id: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Delete certificate',
      text: `The certificate with id = ${id} was delete.`,
      btnReturnAll: `Go to all`
    };

    const dialogRef = this.dialog.open(InfoWindowComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.routerNav.navigate(['/']);
    });
  }
}
