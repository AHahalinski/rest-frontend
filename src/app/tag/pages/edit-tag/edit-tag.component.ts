import { switchMap } from 'rxjs/operators';
import { DialogWindowComponent } from 'src/app/shared/components/dialog-window/dialog-window.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/shared/entity/Tag';
import { InfoWindowComponent } from 'src/app/shared/components/info-window/info-window.component';

@Component({
  selector: 'app-edit-tag',
  templateUrl: './edit-tag.component.html',
  styleUrls: ['./edit-tag.component.scss']
})
export class EditTagComponent implements OnInit {

  readonly REG_EXP_LITTERS = new RegExp('^[a-zA-Z]+$');
  readonly REG_EXP_NUMBERS = new RegExp('^[0-9]+(.[0-9]+)?$');

  public submitted = false;
  public form: FormGroup;
  public tag: Tag;
  private id: number;

  constructor(
    public dialog: MatDialog,
    private tagSevice: TagService,
    private routerUrl: Router,
    private activeRouter: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activeRouter.params.pipe(
      switchMap(params => {
        this.id = params.id;
        return this.tagSevice.getTagById(this.id);
      })
    ).subscribe(data => {
      this.tag = data;
      this.form = new FormGroup({
        name: new FormControl(this.tag.name, [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern(this.REG_EXP_LITTERS)]),
        type: new FormControl(this.tag.type, Validators.required),
        price: new FormControl(this.tag.price, [
          Validators.required,
          Validators.pattern(this.REG_EXP_NUMBERS)
        ]),
      });
    });
  }

  public update(): void {
    if (this.form.invalid) {
      this.submitted = true;
    }
    const tag = new Tag();
    tag.name = this.form.value.name;
    tag.type = this.form.value.type;
    tag.price = this.form.value.price;
    this.tagSevice.update(this.id, tag).subscribe(response => {
      const updatedTag: Tag = response.body;
      if (response.status === 200) {
        this.showInfoResultOperation(tag.id);
      }
      this.submitted = false;
    }, () => { this.submitted = false; });
  }

  public openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Edit tag',
      text: `Do you want to update this tag?`,
      btnTrue: `Update`,
      btnFalse: `Cancel`
    };
    const dialogRef = this.dialog.open(DialogWindowComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.update();
      }
    });
  }

  private showInfoResultOperation(id: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Edit this tag',
      text: `The tag with id = ${id} was updated.`,
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
