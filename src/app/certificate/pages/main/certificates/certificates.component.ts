import { InfoWindowComponent } from '../../../../shared/components/info-window/info-window.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CertificateService } from 'src/app/services/certificate.service';
import { Certificate } from 'src/app/shared/entity/Certificate';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent implements OnInit, OnDestroy {

  public cards: Certificate[] = [];
  public isAuth: boolean;
  private cSub: Subscription;
  private currentPage = 0;
  private byCertificateName = '';
  private byTagName = [];
  private certificateNameElement: HTMLInputElement;
  private tagNameElement: HTMLInputElement;

  private searchSub$ = new Subject<Event>();

  constructor(
    private dialog: MatDialog,
    private service: CertificateService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.cSub = this.service.getCertificates(this.currentPage++, this.byCertificateName, this.byTagName)
      .subscribe(data => this.cards = data.listDto.content);
    this.isAuth = this.authService.isAuth();

    this.searchSub$.pipe(
      debounceTime(800),
      distinctUntilChanged()
    ).subscribe((event: Event) => {
      const element = (event.target as HTMLInputElement);
      if (element.type === 'search') {
        this.certificateNameElement = element;
        this.byCertificateName = element.value;
      }
      if (element.type === 'select-one') {
        this.tagNameElement = element;
        this.byTagName = [element.value];
      }
      this.currentPage = 0;
      this.cards = [];
      this.loadCertifacates();
    });
  }

  ngOnDestroy(): void {
    if (this.cSub) {
      this.cSub.unsubscribe();
    }
  }

  private loadCertifacates(): void {
    this.cSub = this.service.getCertificates(this.currentPage++, this.byCertificateName, this.byTagName)
      .subscribe(data => {
        this.cards = this.cards.concat(data.listDto.content);
        if (this.cards.length < 1) {
          this.showInfoResultOperation(this.byCertificateName, this.byTagName);
        }
      });
  }

  private showInfoResultOperation(name: string, tag: string[]): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Search certificate',
      text: `Can't find certificate with ${name !== '' ? 'name: "' + name + '"' : ''} ${tag !== [] ? 'tag: "' + tag + '"' : ''}`,
      btnReturnAll: `Reset search`,
      btnReturnDetails: `Continue`,
    };
    const dialogRef = this.dialog.open(InfoWindowComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.certificateNameElement) {
          this.certificateNameElement.value = '';
        }
        if (this.tagNameElement) {
          this.tagNameElement.value = '';
        }
        this.byCertificateName = '';
        this.byTagName = [];
        this.loadCertifacates();
      }
    });
  }

  @HostListener('window:scroll', [])
  public loadCertificatesAfterScroll(): void {
    if (window.pageYOffset + document.documentElement.clientHeight === document.documentElement.scrollHeight) {
      this.loadCertifacates();
    }
  }

  @HostListener('window:input', ['$event'])
  public search(eventq: Event): void {
    this.searchSub$.next(eventq);
  }
}
