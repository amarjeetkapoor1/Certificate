import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { CertificateService } from '../certificate.service';
import { State } from '../certificate.model';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent implements OnInit {

  state:State;
  odt:string
  pdf:string
  constructor(private router:Router, 
    private certiService:CertificateService) { 
      
  }

  ngOnInit() {
    this.state=this.certiService.getState()
    if(this.state.output==null){
      this.router.navigate([""])
    } else {
      this.odt=this.certiService.getUrl(this.state.output['odt'])
      this.pdf=this.certiService.getUrl(this.state.output['pdf'])
    }
  }

}
