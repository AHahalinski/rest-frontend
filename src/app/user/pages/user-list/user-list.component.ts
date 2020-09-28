import { User } from './../../entity/user';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  public users: User[];
  private tSub: Subscription;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.tSub = this.userService.getUsers()
      .subscribe(data => this.users = data.listDto.content);
  }

  ngOnDestroy(): void {
    this.tSub.unsubscribe();
  }
}
