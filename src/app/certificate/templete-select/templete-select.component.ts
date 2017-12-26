import { Component, OnInit } from '@angular/core';
import {} from './../certificate.store';
import { Router } from '@angular/router';
import { RequestOptions,Http,Headers } from '@angular/http';
import { State } from '../certificate.model';
import { CertificateService } from '../certificate.service';
@Component({
  selector: 'app-templete-select',
  templateUrl: './templete-select.component.html',
  styleUrls: ['./templete-select.component.css']
})
export class TempleteSelectComponent implements OnInit {

  state:State;
  urls=[]
  constructor( private router: Router,private http:Http,private certiService:CertificateService) { }

  ngOnInit() {
    this.state=this.certiService.getState()
    for (let i of this.certiService.TempleteUrls){
      this.urls.push({"name":i, "url":"/assets/designs/"+i+".jpg"})
    }
  }

  onSelect(selectedUrl: string){
    this.state.SelectedTemplete=selectedUrl;
    this.certiService.updateState(this.state)
    this.router.navigate(['baseform'])
    console.log(this.state)
  }
}
