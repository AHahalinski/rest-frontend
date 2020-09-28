import { Subscription } from 'rxjs';
import { TagService } from './../../../services/tag.service';
import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/shared/entity/Tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  private tSbc: Subscription;
  public tags: Tag;

  constructor(private service: TagService) { }

  ngOnInit(): void {
    this.tSbc = this.service.getTags()
      .subscribe(data => this.tags = data.listDto.content);
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    if (this.tSbc) {
      this.tSbc.unsubscribe();
    }
  }
}
