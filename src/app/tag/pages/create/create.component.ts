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
  public submitted = false;
  public form: FormGroup;

  constructor(
    public dialog: MatDialog,
    private tagSevice: TagService,
    private routerUrl: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required)
    });
  }

  public create(): void {
    // if (this.form.invalid) {
    const tag = new Tag();
    tag.name = this.form.value.name;
    tag.type = this.form.value.type;
    tag.price = this.form.value.price;
    console.log(tag);
    this.tagSevice.create(tag)
      .subscribe(response => {
        console.log(response);
        const createdTag: Tag = response.body;
        if (response.status === 201) {
          console.log('Tag was updated');
          this.showInfoResultOperation(createdTag.id);
        }
      });
    // }
    this.submitted = true;
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
