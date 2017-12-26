import {State} from './certificate.model'
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CertificateService{

    constructor(private http:Http) {
        
    }

    state:State={
        SelectedTemplete:"",
        BaseFields: {
        },
        token:"",
        nextMethod:"",
        nextFields:{
        },
        output:{
            "odt":"",
            "pdf":""
        }
    }

    TempleteUrls= ["design1",
    "design2",
    "design3"
    ]

    Url="http://localhost/Certificate/";
    
    getState(){
        return {
            ...this.state
        }
    }

    updateState(state:State){
        this.state=state;
    }

    getRequest(file:string,data:any){
        return this.http.post(this.Url+file, data)
    }

    getUrl(file:string){
        return this.Url+file;
    }

}