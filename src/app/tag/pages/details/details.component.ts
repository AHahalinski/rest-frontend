import { AuthService } from 'src/app/services/auth.service';
import { DialogWindowComponent } from 'src/app/shared/components/dialog-window/dialog-window.component';
import { Subscription } from 'rxjs';
import { Tag } from './../../../shared/entity/Tag';
import { TagService } from './../../../services/tag.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InfoWindowComponent } from 'src/app/shared/components/info-window/info-window.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  public tag: Tag;
  private id: number;
  private tSub: Subscription;

  constructor(
    public auth: AuthService,
    private tagService: TagService,
    private router: ActivatedRoute,
    private routerNav: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe(paramsId => {
      this.id = paramsId.id;
    });
    this.tSub = this.tagService.getTagById(this.id)
      .subscribe((data: Tag) => this.tag = data);
  }

  ngOnDestroy(): void {
    if (this.tSub) {
      this.tSub.unsubscribe();
    }
  }

  private delete(): void {
    this.tagService.delete(this.id).subscribe(response => {
      if (response.status === 204) {
        this.showInfoResultOperation(this.id);
      }
    });
  }

  public openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Delete tag',
      text: `Do you want to delete this tag?`,
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
      title: 'Delete tag',
      text: `The tag with id = ${id} was delete.`,
      btnReturnAll: `Go to all`
    };
    const dialogRef = this.dialog.open(InfoWindowComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.routerNav.navigate(['/tags']);
    });
  }
}
