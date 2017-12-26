import { Component } from '@angular/core';
import {CertificateService} from './certificate/certificate.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[CertificateService]
})
export class AppComponent {
  title = 'app';
}
