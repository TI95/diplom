import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PopupComponent} from "./components/popup/popup.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoaderComponent } from './components/loader/loader.component';




@NgModule({
  declarations: [PopupComponent, LoaderComponent, LoaderComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  exports: [PopupComponent, CommonModule,  LoaderComponent]
})
export class SharedModule { }
