import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CertificateService } from '../certificate.service';
import { State } from '../certificate.model';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.css']
})
export class BaseFormComponent implements OnInit {

  Fields=["InstitutionName",
  "AidedStatus",
  "InstituteTagline",
  "Affiliation",
  "Event",
  "Topic",
  "SignatureLeft",
  "Designation",	
  "SignatureMiddle",
  "Designtion",
  "SignatureRight",
  "Desigantion"]

  public myForm: FormGroup;
  state:State
  
  constructor( private router: Router,
    private certiService:CertificateService,
    public ngProgress: NgProgress) {
  
    }

  destory:boolean=true;
  ngOnDestroy() {
    if(this.destory){
      this.router.navigate([''])
    }
  }

  ngOnInit() {
    this.state=this.certiService.getState();
    this.myForm=new FormGroup({
      "main": new FormGroup({}),
      "nextMethod": new FormControl("manual")
    })

    for(let i of this.Fields){
      (<FormGroup>this.myForm.get("main"))
      .addControl(i,new FormControl(
        null,Validators.required))
    }
    
  }

  inValidElement(element:string){
   return !this.myForm.get('main.'+element).valid && 
   this.myForm.get('main.'+element).touched
  }
  
  onSubmit(){
    this.ngProgress.start();
    this.state.BaseFields={
      ...this.myForm.get("main").value
    }
    
    let sendObj ={
      "main":this.state.BaseFields,
      "Sel":this.state.SelectedTemplete
    }

    this.certiService.getRequest('start.php', 
    JSON.stringify(sendObj)).subscribe(res => {
      this.state.nextMethod=this.myForm.value["nextMethod"]
      this.state.token=res.json();
      this.certiService.updateState({...this.state})
      this.ngProgress.done();
      this.destory=false;
      this.router.navigate([this.myForm.value["nextMethod"]])
    });

  }
}
