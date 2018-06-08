import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Ag Grid
import {AgGridModule} from "ag-grid-angular/main";

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
