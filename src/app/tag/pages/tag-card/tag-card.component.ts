import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/shared/entity/Tag';

@Component({
  selector: 'app-tag-card',
  templateUrl: './tag-card.component.html',
  styleUrls: ['./tag-card.component.scss']
})
export class TagCardComponent implements OnInit {

  @Input() tag: Tag;

  constructor() { }

  ngOnInit(): void {
  }

}
