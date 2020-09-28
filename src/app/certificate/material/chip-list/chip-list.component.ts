import { TagService } from './../../../services/tag.service';
import { Tag } from 'src/app/shared/entity/Tag';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.scss']
})

export class ChipListComponent implements OnInit {
  public visible = true;
  public selectable = true;
  public removable = true;
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public tagCtrl = new FormControl();
  public filteredTags: Observable<string[]>;
  public tagsFromCertificateString: string[] = [];
  allTagsString: string[] = [];

  @Input() tagsFromCertificate: Tag[];
  allTags$: Observable<any>;
  // @Input() allTags: Tag[];
  allTags: Tag[] = [];


  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @Output() tagsOutput = new EventEmitter<Tag[]>();

  constructor(private tagService: TagService) {
    // tslint:disable-next-line: deprecation
    this.filteredTags = this.tagCtrl.valueChanges.pipe(startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTagsString.slice()));
    console.log('chip - constructor - allTags: ');
    console.log(this.allTags$);

  }

  ngOnInit(): void {
    console.log('chip - init - start - allTags: ');
    console.log(this.allTags$);
    this.allTags$ = this.tagService.getTags();
    this.tagsOutput.emit(this.tagsFromCertificate);
    this.tagsFromCertificate.forEach((tag: Tag) => {
      this.tagsFromCertificateString.push(tag.name);
    });

    // this.allTags?.forEach((tag: Tag) => {
    //   this.allTagsString.push(tag.name);
    // });

    this.allTags$.subscribe(tags => { this.allTags = tags.listDto.content;
                                      this.allTags.map((tag: Tag) => this.allTagsString.push(tag.name)); }
    );


    console.log('chip - init - end - allTags: ');
    console.log(this.allTags$);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our tag
    if ((value || '').trim()
      && this.allTagsString.includes(value)
      && !this.tagsFromCertificateString.includes(value)) {
      this.tagsFromCertificateString.push(value.trim());
      this.addToCertificateTags(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.tagCtrl.setValue(null);
  }

  remove(nameTag: string): void {
    const index = this.tagsFromCertificateString.indexOf(nameTag);
    if (index >= 0) {
      this.tagsFromCertificateString.splice(index, 1);
      this.removeFromCertificateTags(nameTag);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.tagsFromCertificateString.includes(event.option.viewValue)) {
      this.tagsFromCertificateString.push(event.option.viewValue);
      this.addToCertificateTags(event.option.viewValue);
    }
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTagsString
      .filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }

  private addToCertificateTags(nameTag: string): void {
    this.tagsFromCertificate.push(this.allTags[this.allTagsString.lastIndexOf(nameTag)]);
    this.tagsOutput.emit(this.tagsFromCertificate);
  }

  private removeFromCertificateTags(nameTag: string): void {
    this.tagsFromCertificate = this.tagsFromCertificate
      .filter((tag: Tag) => tag.name !== nameTag);
    this.tagsOutput.emit(this.tagsFromCertificate);
  }
}
