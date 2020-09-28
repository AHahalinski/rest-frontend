import { CertificateService } from 'src/app/services/certificate.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Tag } from 'src/app/shared/entity/Tag';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Certificate } from 'src/app/shared/entity/Certificate';
import { DialogWindowComponent } from 'src/app/shared/components/dialog-window/dialog-window.component';
import { InfoWindowComponent } from 'src/app/shared/components/info-window/info-window.component';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  public submitted = false;
  public form: FormGroup;
  public returnedTags: Tag[];
  public tagsName: string[] = [];

  constructor(
    public dialog: MatDialog,
    private certificateService: CertificateService,
    private routerUrl: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      durationDays: new FormControl(null, Validators.required),
      tags: new FormControl(null),
      description: new FormControl(null, Validators.required)
    });
  }

  public acceptData(tags: Tag[]): void {
    this.returnedTags = tags;
  }

  public create(): void {
    // if (this.form.invalid) {
    const certificate = new Certificate();
    certificate.name = this.form.value.name;
    certificate.description = this.form.value.description;
    certificate.price = this.form.value.price;
    certificate.durationDays = this.form.value.durationDays;
    certificate.tags = this.returnedTags;
    this.certificateService.create(certificate)
      .subscribe(response => {
        console.log(response);
        const createdCertificate: Certificate = response.body;
        if (response.status === 201) {
          console.log('Certificates was updated');
          this.form.reset();
          this.showInfoResultOperation(createdCertificate.id);
        }
      });
    // }
    this.submitted = true;
  }

  public openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'New certificate',
      text: `Do you want to create new certificate?`,
      btnTrue: `Save`,
      btnFalse: `Cancel`
    };
    const dialogRef = this.dialog.open(DialogWindowComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.create();
      }
    });
  }

  private showInfoResultOperation(id: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Create new certificate',
      text: `The certificate with id = ${id} was created.`,
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
