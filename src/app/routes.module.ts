import { Routes, RouterModule} from '@angular/router'


import { TempleteSelectComponent } from './certificate/templete-select/templete-select.component';
import { BaseFormComponent } from './certificate/base-form/base-form.component';
import {ManualFormComponent} from './certificate/manual-form/manual-form.component'
import {CsvUploadComponent} from './certificate/csv-upload/csv-upload.component'
import { OutputComponent } from './certificate/output/output.component';
import { NgModule } from '@angular/core';

const AppRoutes:Routes=[
    {path: "", component: TempleteSelectComponent},
    {path: "baseform", component: BaseFormComponent},
    {path: "manual", component: ManualFormComponent},
    {path: "csv", component: CsvUploadComponent},
    {path: "output", component: OutputComponent}
]

@NgModule({
    imports: [
      RouterModule.forRoot(AppRoutes)
    ],

    exports:[
        RouterModule
    ]

  })
export class AppRouter { }