import { Subject } from 'rxjs/internal/Subject';
import { OrderService } from './../../../services/order.service';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TagService } from './../../../services/tag.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Tag } from '../../entity/Tag';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  public tags: Tag[];
  private tSbc: Subscription;
  public searchByName: FormControl = new FormControl();
  public amountItemFromCart: number;
  public hasFavorite = false;
  private obs = new Subject<boolean>();

  constructor(
    public auth: AuthService,
    private router: Router,
    private tagService: TagService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    if (this.auth.isAuth()) {
      this.tSbc = this.tagService.getTags()
        .subscribe(data => this.tags = data.listDto.content);
      this.orderService.count$.subscribe(data => this.amountItemFromCart = data);
    }
    this.searchByName.valueChanges.subscribe(() => console.log('searchByName: ' + this.searchByName));
    this.obs.subscribe(data => this.hasFavorite = data);
  }

  ngOnDestroy(): void {
    if (this.tSbc) {
      this.tSbc.unsubscribe();
    }
  }

  public logout(event: Event): void {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }

  public containsSearchig(): boolean {
    return this.router.url === '/certificates';
  }

  public changeIcon(value: boolean): void {
    this.obs.next(!value);
  }
}
