import { BehaviorSubject } from 'rxjs';
import { Certificate } from './../../../../shared/entity/Certificate';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-certificate-row',
  templateUrl: './certificate-row.component.html',
  styleUrls: ['./certificate-row.component.scss']
})
export class CertificateRowComponent implements OnInit {

  @Input() public certificate: Certificate;
  @Input() public amount: Map<number, number>;
  constructor() { }

  ngOnInit(): void {
  }
}
