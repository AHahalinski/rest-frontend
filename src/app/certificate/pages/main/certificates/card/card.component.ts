
import { Component, Input, OnInit } from '@angular/core';
import { Certificate } from 'src/app/shared/entity/Certificate';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit{

  @Input() certificate: Certificate;

  public tagsName: string[] = [];

  constructor() { }
  ngOnInit(): void {
    this.certificate.tags.forEach(tag => this.tagsName.push(tag.name));
  }
}
