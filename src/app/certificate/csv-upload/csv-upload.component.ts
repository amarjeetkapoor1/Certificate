import { Component, OnInit } from '@angular/core';
import { State } from '../certificate.model';
import { FormControl, FormGroup } from '@angular/forms';
import { CertificateService } from '../certificate.service';
import { NgProgress } from 'ngx-progressbar';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-csv-upload',
  templateUrl: './csv-upload.component.html',
  styleUrls: ['./csv-upload.component.css']
})
export class CsvUploadComponent implements OnInit {

  requestSubscription:Subscription;
  state:State;
  constructor( private router: Router, 
    private certiService:CertificateService,
    public ngProgress: NgProgress) {
      
    }

  myForm:FormGroup

  destory:boolean=true;
  ngOnDestroy() {
    if(this.destory){
      this.requestSubscription!==undefined?this.requestSubscription.unsubscribe():" ";
      this.ngProgress.done()
      this.router.navigate([''])
    }
  }
  
  ngOnInit() {
    this.state=this.certiService.getState()
    this.myForm=new FormGroup({
      "csv": new FormControl(null),
      "zip": new FormControl(null)
    })
  }

  csvFile : File; 
  getFiles(event){ 
      this.csvFile = event.target.files[0];
      console.log(this.csvFile);
      
  }

  zipFile : File; 
  getZipFiles(event){ 
      this.zipFile = event.target.files[0];
  }

  onSubmit(){
    this.ngProgress.start();
    const _formData = new FormData();
    _formData.append('file', this.csvFile, this.csvFile.name);
    _formData.append('photo', this.zipFile, this.zipFile.name);
    _formData.append('id',this.state.token);
    this.requestSubscription=this.certiService.getRequest('csv.php',_formData).subscribe(res => {
      this.state.output=res.json();
      this.certiService.updateState({...this.state})
      this.ngProgress.done();
      this.destory=false;
      this.router.navigate(['output'])
    });
  }
}
