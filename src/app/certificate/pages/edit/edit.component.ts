import { OrderService } from './../../../services/order.service';
import { DialogWindowComponent } from 'src/app/shared/components/dialog-window/dialog-window.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CertificateService } from 'src/app/services/certificate.service';
import { Certificate } from 'src/app/shared/entity/Certificate';
import { Tag } from 'src/app/shared/entity/Tag';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InfoWindowComponent } from 'src/app/shared/components/info-window/info-window.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  readonly REG_EXP_LITTERS = new RegExp('^[a-zA-Z]+$');
  readonly REG_EXP_NUMBERS = new RegExp('^[0-9]+(.[0-9]+)?$');

  public form: FormGroup;
  public certificate: Certificate;
  public submitted = false;
  private id: number;
  public returnedTags: Tag[];

  constructor(
    public dialog: MatDialog,
    private certificateService: CertificateService,
    private orderService: OrderService,
    private router: ActivatedRoute,
    private routerUrl: Router) {
  }

  ngOnInit(): void {
    this.router.params.pipe(
      switchMap(params => {
        this.id = params.id;
        return this.certificateService.getCertificateById(this.id);
      })
    ).subscribe(data => {
      this.certificate = data;
      this.form = new FormGroup({
        name: new FormControl(this.certificate.name, [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern(this.REG_EXP_LITTERS)
        ]),
        price: new FormControl(this.certificate.price, [
          Validators.required,
          Validators.pattern(this.REG_EXP_NUMBERS)
        ]),
        durationDays: new FormControl(this.certificate.durationDays, Validators.required),
        tags: new FormControl(this.certificate.tags),
        description: new FormControl(this.certificate.description),
      });
    });
  }

  public acceptData(tags: Tag[]): void {
    this.returnedTags = tags;
  }

  public update(): void {
    if (this.form.invalid) {
      this.submitted = true;
    }
    const certificate = new Certificate();
    certificate.id = this.id;
    certificate.name = this.form.value.name;
    certificate.description = this.form.value.description;
    certificate.price = this.form.value.price;
    certificate.durationDays = this.form.value.durationDays;
    certificate.tags = this.returnedTags;
    console.log(this.returnedTags);
    this.certificateService.update(this.id, certificate).subscribe(response => {
      console.log(response);
      if (response.status === 200) {
        this.form.reset();
        this.showInfoResultOperation(this.id);
        this.orderService.refreshOrder(certificate);
      }
      this.submitted = false;
    }, () => { this.submitted = false; });
  }

  public openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Edit certificate',
      text: `Do you want to update this certificate?`,
      btnTrue: `Update`,
      btnFalse: `Cancel`
    };
    const dialogRef = this.dialog.open(DialogWindowComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log('before close window');
      if (result) {
        this.update();
      }
    });
  }

  private showInfoResultOperation(id: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Update certificate',
      text: `The certificate with id = ${id} was updated.`,
      btnReturnAll: `Go to all`,
      btnReturnDetails: `Go to details`
    };
    const dialogRef = this.dialog.open(InfoWindowComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.routerUrl.navigate([`certificates`]);
      } else {
        this.routerUrl.navigate([`certificates/${id}`]);
      }
    });
  }
}
