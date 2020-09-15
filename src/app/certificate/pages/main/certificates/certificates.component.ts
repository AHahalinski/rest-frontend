import { Component } from '@angular/core';
import { CertificateService } from 'src/app/services/certificate-service.service';
import { Certificate } from 'src/app/shared/entity/Certificate';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent {

  public cards: Certificate[];

  constructor(private service: CertificateService) {
    this.service.getCertificates()
      .subscribe(data => this.cards = data.listDto.content);
  }
}
