
import { Component } from '@angular/core';
import { Certificate } from '../../entity/Certificate';

@Component({
  selector: 'app-nav-top-line',
  templateUrl: './nav-top-line.component.html',
  styleUrls: ['./nav-top-line.component.scss']
})
export class NavTopLineComponent {

  public certificates: Certificate[];

  constructor() { }

}
