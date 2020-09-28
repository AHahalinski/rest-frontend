import { OrderService } from './../../../services/order.service';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TagService } from './../../../services/tag.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Tag } from '../../entity/Tag';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  public tags: Tag[];
  private tSbc: Subscription;
  public searchByName: FormControl = new FormControl();
  public amountItemFromCart: number;

  constructor(
    public auth: AuthService,
    private router: Router,
    private tagService: TagService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.searchByName.valueChanges.subscribe(() => console.log('searchByName: ' + this.searchByName));
    this.tSbc = this.tagService.getTags()
      .subscribe(data => this.tags = data.listDto.content);
    this.orderService.count$.subscribe(data => this.amountItemFromCart = data);
  }

  // tslint:disable-next-line: use-lifecycle-interface
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
}
