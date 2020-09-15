import { TagService } from './../../../services/tag.service';
import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/shared/entity/Tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {

  public tags: Tag;

  constructor(private service: TagService) {
    this.service.getTags()
      .subscribe(data => this.tags = data.listDto.content);
  }

}
