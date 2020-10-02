import { InfoWindowComponent } from './../../../shared/components/info-window/info-window.component';
import { Tag } from './../../../shared/entity/Tag';
import { TagService } from './../../../services/tag.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogWindowComponent } from 'src/app/shared/components/dialog-window/dialog-window.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  readonly REG_EXP_LITTERS = new RegExp('^[a-zA-Z]+$');
  readonly REG_EXP_NUMBERS = new RegExp('^[0-9]+(.[0-9]+)?$');

  public submitted = false;
  public form: FormGroup;

  constructor(
    public dialog: MatDialog,
    private tagSevice: TagService,
    private routerUrl: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(this.REG_EXP_LITTERS)]),
      type: new FormControl(null, Validators.required),
      price: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.REG_EXP_NUMBERS)
      ]),
    });
  }

  public create(): void {
    if (this.form.invalid) {
      this.submitted = true;
    }
    const tag = new Tag();
    tag.name = this.form.value.name;
    tag.type = this.form.value.type;
    tag.price = this.form.value.price;
    this.tagSevice.create(tag).subscribe(response => {
      const createdTag: Tag = response.body;
      if (response.status === 201) {
        this.showInfoResultOperation(createdTag.id);
      }
      this.submitted = false;
    }, () => { this.submitted = false; });
  }

  public openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'New tag',
      text: `Do you want to create new tag?`,
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
      title: 'Create new tag',
      text: `The tag with id = ${id} was created.`,
      btnReturnAll: `Go to all`,
      btnReturnDetails: `Go to details`
    };
    const dialogRef = this.dialog.open(InfoWindowComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.routerUrl.navigate([`tags`]);
      } else {
        this.routerUrl.navigate([`tags/${id}`]);
      }
      this.form.reset();
    });
  }
}
