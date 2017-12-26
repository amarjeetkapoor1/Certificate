import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'

import { TempleteSelectComponent } from './certificate/templete-select/templete-select.component';
import { AppComponent } from './app.component';
import { BaseFormComponent } from './certificate/base-form/base-form.component';
import { OutputComponent } from './certificate/output/output.component';
import { AppRouter} from './routes.module';
import { HeaderComponent } from './header/header.component';
import { ManualFormComponent } from './certificate/manual-form/manual-form.component';
import { CsvUploadComponent } from './certificate/csv-upload/csv-upload.component'
import { HttpModule } from '@angular/http';
import { NgProgressModule } from 'ngx-progressbar';

@NgModule({
  declarations: [
    AppComponent,
    TempleteSelectComponent,
    BaseFormComponent,
    OutputComponent,
    HeaderComponent,
    ManualFormComponent,
    CsvUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRouter,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgProgressModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
