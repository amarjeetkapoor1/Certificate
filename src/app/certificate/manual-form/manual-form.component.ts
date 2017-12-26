import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgProgress } from 'ngx-progressbar';

import { Router } from '@angular/router';
import { RequestOptions,Http,Headers } from '@angular/http';
import { Validators } from '@angular/forms';
import { CertificateService } from '../certificate.service';
import { State } from '../certificate.model';

@Component({
  selector: 'app-manual-form',
  templateUrl: './manual-form.component.html',
  styleUrls: ['./manual-form.component.css']
})
export class ManualFormComponent implements OnInit {
  Fields=["NameInitial",
  "FirstName", 	
  "MiddleName", 	
  "LastName",
  "Institution",	
  "City",
  "State"
]

  public myForm: FormGroup;
  state:State;
  constructor( private router: Router,
    private http:Http,
    private certiService:CertificateService,
    public ngProgress: NgProgress) {

    }

  ngOnInit() {
    this.state=this.certiService.getState()
    this.myForm=new FormGroup({
      "main": new FormGroup({}),
      "photo": new FormControl()
    })
    
    for(let i of this.Fields){
      (<FormGroup>this.myForm.get("main"))
      .addControl(i,new FormControl(null,Validators.required))
    }
    
  }

  onSubmit(){
    this.ngProgress.start();
    this.state.nextFields={
      ...this.myForm.get("main").value
    }
    
    let sendObj ={
      ...this.state.nextFields,
      'id':this.state.token
    }
    console.log(sendObj)
    this.http.post(this.certiService.getUrl('final.php'), 
    JSON.stringify(sendObj)).subscribe(res => {
      this.state.output=res.json();
      this.certiService.updateState(this.state)
      this.ngProgress.done();
      this.router.navigate(['output'])
    });
    
  }

  
  
}
