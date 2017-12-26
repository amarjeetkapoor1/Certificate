import {State} from './certificate.model'

export class CertificateService{

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

    getUrl(file:string){
        return this.Url+file;
    }

}